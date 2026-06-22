/* ============================================================================
   services/product/types.ts — Product type definitions
   Source: Architecture Plan v1.1 §29.4 (service-interface contracts)
   ============================================================================ */

export type ProductCategory = "lamps" | "plants" | "candles";
export type InventoryStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface ProductImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  view: "main" | "detail" | "lifestyle" | "dimensions";
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  currency: "PKR";
  shortDescription: string;
  description: string;
  images: ProductImage[];
  cardImage: { url: string; width: number; height: number; alt: string };
  inventory: {
    status: InventoryStatus;
    quantity: number;
  };
  rating?: {
    average: number;
    count: number;
  };
  metadata: Record<string, string>;
  tags: string[];
  featured: boolean;
}

export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
  sort?: "featured" | "price-low-high" | "price-high-low" | "newest" | "best-selling";
  search?: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
