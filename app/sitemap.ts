import type { MetadataRoute } from "next";

const siteUrl = "https://sensys.ca";

type SitemapEntry = {
  path: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

const pages: SitemapEntry[] = [
  { path: "/", lastModified: "2026-10-02", changeFrequency: "weekly", priority: 1.0 },

  { path: "/research", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.9 },
  { path: "/research/amr", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research/graphene", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research/pesticide-detection", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research/water-quality", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },

  { path: "/people", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.9 },
  { path: "/people/sanket-goel", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
  { path: "/people/ks-deepak", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.7 },
  { path: "/people/parvathy-nair", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.7 },

  { path: "/publications", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.9 },
  { path: "/patents", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.7 },
  { path: "/books", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.6 },
  { path: "/news", lastModified: "2026-10-01", changeFrequency: "weekly", priority: 0.8 },
  { path: "/facilities", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
  { path: "/join", lastModified: "2026-10-01", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(`${page.lastModified}T00:00:00.000Z`),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
