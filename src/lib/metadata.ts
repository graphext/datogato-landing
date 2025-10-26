import { MetadataRoute } from "next";
import { getPostSummaries } from "@/lib/blog";

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

export async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: new Date(),
    },
  ];

  const posts = await getPostSummaries();

  // If there are posts, update blog index lastModified to latest post date
  if (posts.length > 0) {
    const latest = posts.reduce((acc, p) => (p.date > acc ? p.date : acc), posts[0].date);
    const latestDate = new Date(latest);
    const blogIndex = entries.find((e) => e.url === `${siteUrl}/blog`);
    if (blogIndex) {
      blogIndex.lastModified = latestDate;
    }
  }

  for (const post of posts) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: post.date ? new Date(post.date) : new Date(),
    });
  }

  return entries;
}
