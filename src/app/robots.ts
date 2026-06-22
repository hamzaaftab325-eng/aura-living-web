import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const isProduction = process.env.NODE_ENV === "production";

  return {
    rules: isProduction
      ? [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/cart", "/checkout", "/account", "/orders", "/api", "/login", "/register", "/search", "/maintenance", "/offline"],
          },
        ]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
