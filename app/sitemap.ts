import type {
  MetadataRoute,
} from "next";

const BASE_URL =
  "https://sensys.ca";

export default function sitemap():
  MetadataRoute.Sitemap {
  const now =
    new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency:
        "weekly",
      priority: 1,
    },

    {
      url:
        `${BASE_URL}/research`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url:
        `${BASE_URL}/people`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url:
        `${BASE_URL}/facilities`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/publications`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.9,
    },

    {
      url:
        `${BASE_URL}/patents`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.7,
    },

    {
      url:
        `${BASE_URL}/books`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.6,
    },

    {
      url:
        `${BASE_URL}/news`,
      lastModified: now,
      changeFrequency:
        "weekly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/join`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/research/amr`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/research/graphene`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.7,
    },

    {
      url:
        `${BASE_URL}/research/pesticide-detection`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/research/water-quality`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/people/sanket-goel`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.8,
    },

    {
      url:
        `${BASE_URL}/people/ks-deepak`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.7,
    },

    {
      url:
        `${BASE_URL}/people/parvathy-nair`,
      lastModified: now,
      changeFrequency:
        "monthly",
      priority: 0.7,
    },
  ];
}