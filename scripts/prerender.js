const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const http = require("http");
const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");

const routes = ["/", "/cost-items", "/group-member", "/calculation", "/faq", "/about", "/blog"];
const buildDir = path.join(__dirname, "../build");
const outputDir = path.join(__dirname, "../prerendered");

// SPA fallback 静态服务
function spaStatic(root) {
  const serve = serveStatic(root);
  return (req, res) => {
    serve(req, res, () => {
      // fallback 到 index.html
      fs.createReadStream(path.join(root, "index.html")).pipe(res);
    });
  };
}

(async () => {
  // 清空输出目录
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const server = http.createServer(spaStatic(buildDir));

  // 自动选择空闲端口
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`Server started on port ${port}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:${port}${route}`;
    console.log(`Prerendering ${url}`);
    await page.goto(url, { waitUntil: "networkidle0" });

    const html = await page.content();

    // 输出到 build 对应路径，子页面为子目录/index.html
    const outDir = path.join(buildDir, route === "/" ? "" : route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

    console.log(`✅ Saved: ${path.join(outDir, "index.html")}`);
  }

  await browser.close();
  server.close();
})();
