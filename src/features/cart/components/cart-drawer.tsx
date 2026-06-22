"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import { formatPKR } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    drawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCartStore();

  useEffect(() => {
    // Rehydrate on mount (skipHydration pattern)
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  if (!mounted || !drawerOpen) return null;

  const sub = subtotal();

  return (
    <div className="fixed inset-0 z-[var(--z-drawer)]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF8F2] shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0EBDC]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8A6B26]" />
            <h2 className="text-h4 font-display">Your Cart</h2>
            {items.length > 0 && (
              <span className="text-body-sm text-[#5A5A5A]">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-2 text-[#2A2A2A] hover:text-[#8A6B26]"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 mb-4 rounded-full bg-[#F0EBDC] flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#8A8275]" />
            </div>
            <h3 className="text-h4 mb-2">Your cart is empty</h3>
            <p className="text-body-sm text-[#5A5A5A] mb-6 max-w-xs">
              Your cart is waiting to be filled with beautiful things. Start with our bestsellers.
            </p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="btn-gold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeDrawer}
                    className="flex-shrink-0"
                  >
                    { }
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-25 object-cover rounded-sm bg-[#F0EBDC]"
                      width={80}
                      height={100}
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-medium text-[#0A0A0A] hover:text-[#8A6B26] line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-caption text-[#5A5A5A] mt-0.5 capitalize">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#F0EBDC] rounded-sm">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-[#F0EBDC] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-[#F0EBDC] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-[#0A0A0A]">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-[#8A8275] hover:text-[#B23A3A] transition-colors self-start"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-[#F0EBDC] p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span className="text-[#5A5A5A]">Subtotal</span>
                  <span className="font-medium">{formatPKR(sub)}</span>
                </div>
                <p className="text-caption text-[#5A5A5A]">
                  Shipping and discounts calculated at checkout.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="btn-outline-gold"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="btn-gold"
                >
                  Checkout
                </Link>
              </div>
              <p className="text-center text-caption text-[#5A5A5A]">
                Free shipping on orders over Rs 5,000 · COD available
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
