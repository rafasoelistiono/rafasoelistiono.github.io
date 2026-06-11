import { siteConfig, absoluteUrl } from "@/lib/site";

export default async function sitemap() {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: absoluteUrl("/experience"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7
    },
  ];
}
