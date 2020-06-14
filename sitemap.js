const sitemap = require("nextjs-sitemap-generator");

sitemap({
  alternateUrls: {
    en: "https://tiktoktools.app",
    vi: "https://tiktoktools.app/vi",
  },
  baseUrl: "https://tiktoktools.app",
  extraPaths: [""],
  ignoredPaths: ["index", "vi", "en"],
  pagesDirectory: __dirname + "/src/pages",
  targetDirectory: "public/",
  nextConfigPath: __dirname + "/next.config.js",
  ignoredExtensions: ["png", "jpg"],
});
