const sitemap = require("nextjs-sitemap-generator");

sitemap({
  alternateUrls: {
    en: "https://tiktoktools.app",
    vi: "https://tiktoktools.app/vi",
  },
  baseUrl: "https://tiktoktools.app",
  ignoredPaths: ["admin"],
  pagesDirectory: __dirname + "/src/pages",
  targetDirectory: "public/",
  nextConfigPath: __dirname + "/next.config.js",
  ignoredExtensions: ["png", "jpg"],
  sitemapStylesheet: [
    {
      type: "text/css",
      styleFile: "/test/styles.css",
    },
    {
      type: "text/xsl",
      styleFile: "test/test/styles.xls",
    },
  ],
});
