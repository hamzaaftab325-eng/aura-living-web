"use client";

import Link from "next/link";
import { ShoppingBag, Heart, Star } from "lucide-react";
import type { Product } from "@/services/product/types";
import { formatPKR, formatDiscount } from "@/lib/format";
import { useCartStore, useWishlistStore } from "@/features/cart/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  priority?: boolean | "true" | "false";
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const [mounted, _setMounted] = [false, () => {}];
  const discount = formatDiscount(product.price, product.compareAtPrice);
  const isLowStock = product.inventory.status === "low-stock";
  const isOutOfStock = product.inventory.status === "out-of-stock";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
    toast.success(`Added ${product.name} to wishlist`);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-[4/5] bg-[#F0EBDC] rounded-sm overflow-hidden mb-3">
        { }
        <img
          src={product.cardImage.url}
          alt={product.cardImage.alt}
          width={product.cardImage.width}
          height={product.cardImage.height}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "w-full h-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
            isOutOfStock && "opacity-60 grayscale"
          )}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="bg-[#0E0E0E] text-cream text-caption font-semibold px-2 py-1 rounded-sm">
              -{discount}%
            </span>
          )}
          {product.featured && (
            <span className="bg-[#C9A84C] text-[#0E0E0E] text-caption font-semibold px-2 py-1 rounded-sm">
              Featured
            </span>
          )}
          {isLowStock && (
            <span className="bg-[#B8860B] text-cream text-caption font-semibold px-2 py-1 rounded-sm">
              Only {product.inventory.quantity} left
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-[#B23A3A] text-cream text-caption font-semibold px-2 py-1 rounded-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-[#2A2A2A] hover:text-[#B23A3A] opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick add */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-[#0E0E0E] text-cream text-sm font-medium py-2.5 rounded-sm flex items-center justify-center gap-2 hover:bg-[#C9A84C] hover:text-[#0E0E0E] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-caption text-[#5A5A5A]">
          <span className="capitalize">{product.category}</span>
          {product.rating && (
            <>
              <span aria-hidden="true">·</span>
              <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
              <span>{product.rating.average.toFixed(1)}</span>
              <span className="text-[#8A8275]">({product.rating.count})</span>
            </>
          )}
        </div>
        <h3 className="text-sm md:text-base font-display font-medium text-[#0A0A0A] group-hover:text-[#8A6B26] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-body-sm text-[#5A5A5A] line-clamp-1">
          {product.shortDescription}
        </p>
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
}
