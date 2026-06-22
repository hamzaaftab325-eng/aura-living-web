"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingBag, Heart, MessageCircle, Star, ChevronDown, Check, Truck, RefreshCw, Shield } from "lucide-react";
import type { Product } from "@/services/product/types";
import { formatPKR, formatDiscount } from "@/lib/format";
import { useCartStore, useWishlistStore } from "@/features/cart/store";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { toast } from "sonner";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const discount = formatDiscount(product.price, product.compareAtPrice);
  const isOutOfStock = product.inventory.status === "out-of-stock";
  const isLowStock = product.inventory.status === "low-stock";

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(
      {
        id: product.slug,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.cardImage.url,
        category: product.category,
      },
      quantity
    );
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    toggleWishlist(product.slug);
    toast.success(`Added ${product.name} to wishlist`);
  };

  const waMessage = encodeURIComponent(
    `Hi Aura Living team, I'm interested in the ${product.name}. Could you tell me more?`
  );

  const accordions = [
    {
      id: "description",
      label: "Description",
      content: product.description,
    },
    {
      id: "materials",
      label: "Materials & Care",
      content: Object.entries(product.metadata)
        .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
        .join("\n"),
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      content:
        "Standard delivery 3–5 business days across Pakistan (Rs 200, free over Rs 5,000). Express 1–2 days (Rs 450). Same-day within Karachi, Lahore, Islamabad (Rs 700). 7-day returns — no questions asked. Cash on delivery available.",
    },
  ];

  return (
    <div className="container-page section-y">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumb strip (desktop) */}
          <div className="flex md:flex-col gap-3 md:w-20">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-[4/5] rounded-sm overflow-hidden border-2 transition-colors ${
                  selectedImage === idx ? "border-[#C9A84C]" : "border-transparent hover:border-[#F0EBDC]"
                }`}
                aria-label={`View ${img.view} image`}
              >
                { }
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 aspect-[4/5] bg-[#F0EBDC] rounded-sm overflow-hidden relative">
            { }
            <img
              src={product.images[selectedImage]?.url}
              alt={product.images[selectedImage]?.alt ?? product.name}
              className="w-full h-full object-cover"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-[#0E0E0E] text-cream text-sm font-semibold px-3 py-1.5 rounded-sm">
                -{discount}% off
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:py-4">
          <p className="text-overline text-gold mb-3 capitalize">{product.category}</p>
          <h1 className="text-h1 text-balance mb-4">{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= Math.round(product.rating!.average)
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "text-[#F0EBDC]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-body-sm text-[#5A5A5A]">
                {product.rating.average.toFixed(1)} · {product.rating.count} reviews
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-h2 font-display">{formatPKR(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-body-lg text-[#8A8275] line-through">
                {formatPKR(product.compareAtPrice)}
              </span>
            )}
          </div>
          {discount && (
            <p className="text-body-sm text-[#2E7D5B] mb-4">
              You save {formatPKR((product.compareAtPrice ?? 0) - product.price)} ({discount}% off)
            </p>
          )}

          <p className="text-body-lg text-[#2A2A2A] mb-6 text-pretty">
            {product.shortDescription}
          </p>

          {/* Inventory status */}
          {isLowStock && (
            <p className="text-body-sm text-[#B8860B] font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
              Only {product.inventory.quantity} left — order soon
            </p>
          )}
          {isOutOfStock && (
            <p className="text-body-sm text-[#B23A3A] font-medium mb-4">
              Currently sold out. Notify me when available.
            </p>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-[#F0EBDC] rounded-sm">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-[#F0EBDC] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-sm font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-[#F0EBDC] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              className="p-3 border border-[#F0EBDC] rounded-sm hover:border-[#8A6B26] transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp enquiry */}
          <a
            href={`https://wa.me/${WHATSAPP_CONFIG.number}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#5A5A5A] hover:text-[#25D366] transition-colors mb-6"
          >
            <MessageCircle className="w-4 h-4" />
            Ask about this product on WhatsApp
          </a>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#F0EBDC] mb-6">
            <div className="text-center">
              <Truck className="w-5 h-5 mx-auto text-[#8A6B26] mb-2" />
              <p className="text-caption text-[#5A5A5A]">COD available</p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-5 h-5 mx-auto text-[#8A6B26] mb-2" />
              <p className="text-caption text-[#5A5A5A]">7-day returns</p>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 mx-auto text-[#8A6B26] mb-2" />
              <p className="text-caption text-[#5A5A5A]">Secure checkout</p>
            </div>
          </div>

          {/* Accordions */}
          <div className="space-y-2">
            {accordions.map((acc) => (
              <div key={acc.id} className="border-b border-[#F0EBDC]">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                  aria-expanded={openAccordion === acc.id}
                >
                  <span className="text-base font-semibold text-[#0A0A0A]">{acc.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5A5A5A] transition-transform ${
                      openAccordion === acc.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === acc.id && (
                  <div className="pb-4 text-body-sm text-[#2A2A2A] whitespace-pre-line leading-relaxed">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
