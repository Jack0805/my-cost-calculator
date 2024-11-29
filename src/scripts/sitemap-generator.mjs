import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const generateSitemap = async () => {
  const sitemap = new SitemapStream({
    hostname: "https://billsplit.io",
    xmlns: { image: true }, // Enable image namespace
  });

  const routes = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/group-member", changefreq: "weekly", priority: 0.8 },
    { url: "/cost-items", changefreq: "weekly", priority: 0.8 },
    { url: "/calculation", changefreq: "weekly", priority: 0.8 },
  ];

  // Define images only for the root URL
  const rootImages = [
    {
      url: "https://billsplit.io/static/media/modern-bill-sharing-illustration.050f21418083a07943d4.webp",
      title: "Friendly Bill Splitting App",
      caption: "A friendly and modern app for splitting bills easily.",
    },
    {
      url: "https://billsplit.io/static/media/bill-splitting-app-discussion.3630d82b230c0c691727.webp",
      title: "Collaborative Expense Sharing",
      caption: "Collaborate effortlessly with group expense sharing.",
    },
    {
      url: "https://billsplit.io/static/media/friendly-bill-sharing-app.10abe8a70652f41b2e25.webp",
      title: "Simplify Group Bills",
      caption: "Simplify splitting group bills using our tool.",
    },
    {
      url: "https://billsplit.io/static/media/group-expense-management-app.d5fa1bfc4bb1a5c0d723.webp",
      title: "Stress-Free Bill Splitting",
      caption: "Stress-free bill splitting for friends and groups.",
    },
    {
      url: "https://billsplit.io/static/media/split-bill-web-tool.0e8aff7caab0a3715c02.webp",
      title: "Modern Bill Splitting App",
      caption: "A modern app designed for group expense management.",
    },
    {
      url: "https://billsplit.io/static/media/split-bills-group-expenses.d1b17587be3dece6f23a.webp",
      title: "Group Expense Manager",
      caption: "Efficiently manage group expenses with ease.",
    },
    {
      url: "https://billsplit.io/static/media/team-bill-splitting-solution.05cbb792efd9872e14b1.webp",
      title: "Easy Bill Splitting",
      caption: "Make splitting bills simple and enjoyable.",
    },
  ];

  // Add routes to the sitemap
  routes.forEach((route) => {
    const sitemapEntry = {
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
    };

    // Add images only for the root URL
    if (route.url === "/") {
      sitemapEntry.img = rootImages.map((image) => ({
        url: image.url,
        title: image.title,
        caption: image.caption,
      }));
    }

    sitemap.write(sitemapEntry);
  });

  sitemap.end();

  // Write sitemap to file
  const sitemapBuffer = await streamToPromise(sitemap);
  createWriteStream("../../public/sitemap.xml").write(sitemapBuffer);

  console.log("Sitemap with images generated: ./public/sitemap.xml");
};

generateSitemap();
