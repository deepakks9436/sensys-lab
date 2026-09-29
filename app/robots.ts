import type {
  MetadataRoute,
} from "next";

export default function robots():
  MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/hub/",
          "/login",
          "/logout",
          "/forgot-password",
          "/reset-password",
          "/auth/",
          "/api/",
        ],
      },
    ],

    sitemap:
      "https://sensys.ca/sitemap.xml",

    host:
      "https://sensys.ca",
  };
}