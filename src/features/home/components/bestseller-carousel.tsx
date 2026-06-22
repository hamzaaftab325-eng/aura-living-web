"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Product } from "@/services/product/types";
import { formatPKR, formatDiscount } from "@/lib/format";
import { useCartStore } from "@/features/cart/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BestsellerCarouselProps {
  products: Product[];
}

export function BestsellerCarousel({ products }: BestsellerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.slug,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.cardImage.url,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="surface-cream section-y" aria-label="Bestselling products">
      <div className="container-page">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div className="max-w-xl">
            <p className="text-overline text-gold mb-3">Most Loved</p>
            <h2 className="text-h2 text-balance">The pieces our customers keep coming back for.</h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F0EBDC] hover:border-[#8A6B26] hover:bg-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F0EBDC] hover:border-[#8A6B26] hover:bg-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 md:px-[max(1rem,calc((100vw-90rem)/2))] pb-4 snap-x"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product) => {
          const discount = formatDiscount(product.price, product.compareAtPrice);
          const isOutOfStock = product.inventory.status === "out-of-stock";
          return (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="group block w-[260px] md:w-[280px] flex-shrink-0 snap-start"
            >
              <div className="relative aspect-[4/5] bg-[#F0EBDC] rounded-sm overflow-hidden mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.cardImage.url}
                  alt={product.cardImage.alt}
                  width={product.cardImage.width}
                  height={product.cardImage.height}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
                    isOutOfStock && "opacity-60 grayscale"
                  )}
                />
                {discount && (
                  <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#0E0E0E] text-caption font-bold px-2 py-1 rounded-sm">
                    -{discount}%
                  </span>
                )}
                {!isOutOfStock && (
                  <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, product)}
                      className="w-full bg-[#0E0E0E] text-cream text-sm font-medium py-2.5 rounded-sm flex items-center justify-center gap-2 hover:bg-[#C9A84C] hover:text-[#0E0E0E] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-caption text-[#8A8275] capitalize">{product.metadata.origin || product.category}</p>
                <h3 className="text-sm md:text-base font-display font-medium text-[#0A0A0A] group-hover:text-[#8A6B26] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                    <span className="text-caption text-[#5A5A5A]">
                      {product.rating.average.toFixed(1)} ({product.rating.count})
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm md:text-base font-semibold text-[#0A0A0A]">
                    {formatPKR(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-body-sm text-[#8A8275] line-through">
                      {formatPKR(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
        {/* End card — view all */}
        <Link
          href="/shop"
          className="group flex flex-col items-center justify-center w-[200px] md:w-[240px] flex-shrink-0 snap-start bg-[#0E0E0E] rounded-sm text-cream p-8 text-center"
        >
          <span className="text-h3 font-display mb-3">View All</span>
          <p className="text-caption text-cream/60 mb-4">48 curated pieces</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] group-hover:gap-3 transition-all">
            Shop all <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
