import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const generateSitemap = async () => {
  const sitemap = new SitemapStream({
    hostname: "https://billsplit.io",
    xmlns: { image: true }, // Enable image namespace
  });

  // Define routes with image data
  const routes = [
    {
      url: "/",
      changefreq: "daily",
      priority: 1.0,
      images: [
        {
          url: "https://billsplit.io/images/image1.webp",
          title: "Friendly Bill Splitting App",
          caption: "A friendly and modern app for splitting bills easily.",
        },
        {
          url: "https://billsplit.io/images/image2.webp",
          title: "Collaborative Expense Sharing",
          caption: "Collaborate effortlessly with group expense sharing.",
        },
        {
          url: "https://billsplit.io/images/image3.webp",
          title: "Simplify Group Bills",
          caption: "Simplify splitting group bills using our tool.",
        },
        {
          url: "https://billsplit.io/images/image4.webp",
          title: "Stress-Free Bill Splitting",
          caption: "Stress-free bill splitting for friends and groups.",
        },
        {
          url: "https://billsplit.io/images/image5.webp",
          title: "Modern Bill Splitting App",
          caption: "A modern app designed for group expense management.",
        },
        {
          url: "https://billsplit.io/images/image6.webp",
          title: "Group Expense Manager",
          caption: "Efficiently manage group expenses with ease.",
        },
        {
          url: "https://billsplit.io/images/image7.webp",
          title: "Easy Bill Splitting",
          caption: "Make splitting bills simple and enjoyable.",
        },
      ],
    },
  ];

  // Add routes with images to the sitemap
  routes.forEach((route) => {
    const sitemapEntry = {
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      img: route.images.map((image) => ({
        url: image.url,
        title: image.title,
        caption: image.caption,
      })),
    };
    sitemap.write(sitemapEntry);
  });

  sitemap.end();

  // Write sitemap to file
  const sitemapBuffer = await streamToPromise(sitemap);
  createWriteStream("./public/sitemap.xml").write(sitemapBuffer);

  console.log("Sitemap with images generated: ./public/sitemap.xml");
};

generateSitemap();
