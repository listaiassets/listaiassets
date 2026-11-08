import { MetadataRoute } from "next";
import { DETAILED_TOOLS } from "@/lib/data/tools";
import { CATEGORIES_DATA } from "@/lib/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://listaiassets.com";
  const now = new Date();

  // 1. Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 2. All 18 Category Dynamic Deep-Dive Routes (/categories/[slug])
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES_DATA.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.88,
  }));

  // 3. Dynamic Comparison Matrix Routes (/compare/[slug])
  const comparisonRoutes: MetadataRoute.Sitemap = [];
  for (let i = 0; i < DETAILED_TOOLS.length; i++) {
    for (let j = i + 1; j < Math.min(DETAILED_TOOLS.length, i + 3); j++) {
      const toolA = DETAILED_TOOLS[i];
      const toolB = DETAILED_TOOLS[j];
      comparisonRoutes.push({
        url: `${baseUrl}/compare/${toolA.slug}-vs-${toolB.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return [...staticRoutes, ...categoryRoutes, ...comparisonRoutes];
}
