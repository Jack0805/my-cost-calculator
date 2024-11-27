import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: "https://billsplit.io" });

  // Add your routes with hash fragments
  const routes = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/#/group-member", changefreq: "weekly", priority: 0.8 },
    { url: "/#/cost-items", changefreq: "weekly", priority: 0.8 },
    { url: "/#/calculation", changefreq: "weekly", priority: 0.8 },
  ];

  routes.forEach((route) => sitemap.write(route));

  sitemap.end();

  const sitemapBuffer = await streamToPromise(sitemap);
  createWriteStream("../public/sitemap.xml").write(sitemapBuffer);
};

generateSitemap();
