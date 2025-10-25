import { MetadataRoute } from "next";

export const siteUrl = "https://gatodato.com";
export const siteName = "Gatodato";

export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
  ];
}
