/* ============================================================================
   services/product/index.ts — Service resolver (mock vs supabase)
   Source: Architecture Plan v1.1 §21.3, §29.4
   The frontend phase always uses mock. The swap is invisible to components.
   ============================================================================ */

import { env } from "@/lib/env";
import type { Product, ProductFilters, Paginated } from "./types";
import {
  mockProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  getBestsellers,
  getRelatedProducts,
  searchProducts,
} from "./mock";

export type { Product, ProductImage, ProductFilters, Paginated, ProductCategory, InventoryStatus } from "./types";

export const productService = {
  async list(filters: ProductFilters = {}): Promise<Product[]> {
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      throw new Error("Supabase product service not implemented — see ADR-0007");
    }
    await delay();
    let result = [...mockProducts];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.subcategory) {
      result = result.filter((p) => p.subcategory === filters.subcategory);
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.inStock) {
      result = result.filter((p) => p.inventory.status !== "out-of-stock");
    }
    if (filters.featured) {
      result = result.filter((p) => p.featured);
    }
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter((p) => filters.tags!.some((t) => p.tags.includes(t)));
    }
    if (filters.search) {
      result = searchProducts(filters.search);
    }

    switch (filters.sort) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        result.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
        break;
      case "newest":
      default:
        break;
    }

    return result;
  },

  async getBySlug(slug: string): Promise<Product | null> {
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      throw new Error("Supabase product service not implemented — see ADR-0007");
    }
    await delay();
    return getProductBySlug(slug) ?? null;
  },

  async getFeatured(limit = 8): Promise<Product[]> {
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      throw new Error("Supabase product service not implemented — see ADR-0007");
    }
    await delay();
    return getFeaturedProducts(limit);
  },

  async getBestsellers(limit = 8): Promise<Product[]> {
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      throw new Error("Supabase product service not implemented — see ADR-0007");
    }
    await delay();
    return getBestsellers(limit);
  },

  async getRelated(slug: string, limit = 6): Promise<Product[]> {
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      throw new Error("Supabase product service not implemented — see ADR-0007");
    }
    await delay();
    return getRelatedProducts(slug, limit);
  },

  async getByCategory(category: string): Promise<Product[]> {
    if (!env.NEXT_PUBLIC_USE_MOCKS) {
      throw new Error("Supabase product service not implemented — see ADR-0007");
    }
    await delay();
    return getProductsByCategory(category);
  },
};

async function delay(ms = 250): Promise<void> {
  if (process.env.NODE_ENV === "development") await new Promise((r) => setTimeout(r, ms));
}
