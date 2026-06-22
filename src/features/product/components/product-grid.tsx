"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/features/product/components/product-card";
import type { Product } from "@/services/product/types";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  category?: string;
}

type SortOption = "featured" | "price-low-high" | "price-high-low" | "best-selling";

export function ProductGrid({ products, category }: ProductGridProps) {
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (maxPrice !== null) {
      result = result.filter((p) => p.price <= maxPrice);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inventory.status !== "out-of-stock");
    }
    switch (sort) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        result.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
        break;
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [products, sort, maxPrice, inStockOnly]);

  return (
    <div className="container-page section-y">
      <div className="flex items-center justify-between mb-8">
        <p className="text-body-sm text-[#5A5A5A]">
          Showing <span className="font-semibold text-[#0A0A0A]">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "piece" : "pieces"}
          {category && <> in {category}</>}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden flex items-center gap-2 text-sm text-[#2A2A2A] hover:text-[#8A6B26]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <label className="text-body-sm text-[#5A5A5A] hidden sm:inline">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm bg-white border border-[#F0EBDC] rounded-sm px-3 py-2 text-[#0A0A0A] outline-none focus:border-[#8A6B26]"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="best-selling">Best Selling</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        {/* Filter sidebar (desktop) */}
        <aside className={cn("space-y-6", filtersOpen ? "block" : "hidden md:block")}>
          <div className="flex items-center justify-between md:hidden">
            <h3 className="text-h4">Filters</h3>
            <button type="button" onClick={() => setFiltersOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-overline text-[#5A5A5A] mb-3">Price Range</h3>
            <div className="space-y-2">
              {[
                { label: "All prices", value: null },
                { label: "Under Rs 2,500", value: 2500 },
                { label: "Rs 2,500 – 5,000", value: 5000 },
                { label: "Rs 5,000 – 10,000", value: 10000 },
                { label: "Rs 10,000+", value: 999999 },
              ].map((opt) => (
                <label key={opt.label} className="flex items-center gap-2 text-body-sm cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={maxPrice === opt.value}
                    onChange={() => setMaxPrice(opt.value)}
                    className="accent-[#8A6B26]"
                  />
                  <span className="text-[#2A2A2A]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-overline text-[#5A5A5A] mb-3">Availability</h3>
            <label className="flex items-center gap-2 text-body-sm cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#8A6B26]"
              />
              <span className="text-[#2A2A2A]">In stock only</span>
            </label>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-h4 mb-2">No pieces match your filters</p>
              <p className="text-body-sm text-[#5A5A5A]">
                Try adjusting your filters or browse all products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, idx) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  priority={idx < 4}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
