import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const runLighthouse = async (url: string) => {
  const chrome = await launch({ chromeFlags: ["--headless"] });
  const options = {
    port: chrome.port,
    onlyCategories: ["performance", "seo"],
    settings: { logLevel: "verbose" },
  };
  const results = await lighthouse(url, options);
  console.log(`SEO Score: ${results?.lhr.categories.seo.score}`);
  await chrome.kill();
};

runLighthouse("http://localhost:3000/");
