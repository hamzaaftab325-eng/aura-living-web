import type { MetadataRoute } from "next";
import { mockProducts } from "@/services/product/mock";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages = [
    { url: "", priority: 1, changeFrequency: "daily" as const },
    { url: "/shop", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/shop/lamps", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/shop/plants", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/shop/candles", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/collections", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/lookbook", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/journal", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/shipping-returns", priority: 0.4, changeFrequency: "monthly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/accessibility-statement", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const productPages = mockProducts.map((p) => ({
    url: `/product/${p.slug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...productPages].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
