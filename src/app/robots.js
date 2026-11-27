export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/login",
        "/signup",
        "/api/",
      ],
    },
    sitemap: "https://www.ardsuhail.com/sitemap.xml",
  };
}