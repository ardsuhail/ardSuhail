export default function sitemap() {
  const baseUrl = "https://www.ardsuhail.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-11-26"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-10-23"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date("2025-10-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2025-10-23"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-11-26"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-10-23"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}