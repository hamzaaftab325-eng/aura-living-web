"use client";

import Link from "next/link";
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/features/cart/store";
import { formatPKR } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartPage() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    applyCoupon,
    removeCoupon,
    couponCode,
    couponDiscount,
    discount,
  } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sub = subtotal();
  const disc = discount();
  const shippingProgress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifiesFreeShipping = sub >= FREE_SHIPPING_THRESHOLD;
  const shipping = qualifiesFreeShipping ? 0 : 200;
  const total = sub - disc + shipping;

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    setCouponMsg({ ok: result.success, text: result.message });
  };

  if (items.length === 0) {
    return (
      <div className="container-page section-y text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#F0EBDC] flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-[#8A8275]" />
          </div>
          <h1 className="text-h1 mb-4">Your cart is empty</h1>
          <p className="text-body-lg text-[#5A5A5A] mb-8 text-pretty">
            Your cart is waiting to be filled with beautiful things. Start with our bestsellers — brass lamps that cast the right light, plants that thrive here, candles scented with home.
          </p>
          <Link href="/shop" className="btn-gold inline-flex">
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page section-y">
      <h1 className="text-h1 mb-8">Your Cart ({items.length})</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Items */}
        <div>
          {/* Free shipping nudge */}
          <div className="bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm p-4 mb-6">
            {qualifiesFreeShipping ? (
              <p className="text-body-sm text-[#2E7D5B] font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2E7D5B]" />
                You have unlocked free standard shipping!
              </p>
            ) : (
              <>
                <p className="text-body-sm text-[#2A2A2A] mb-2">
                  Add <span className="font-semibold text-[#8A6B26]">{formatPKR(FREE_SHIPPING_THRESHOLD - sub)}</span> more to unlock free shipping
                </p>
                <div className="h-2 bg-[#F0EBDC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A84C] rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white border border-[#F0EBDC] rounded-sm p-4">
                <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                  { }
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-30 object-cover rounded-sm bg-[#F0EBDC]"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`} className="text-base font-display font-medium hover:text-[#8A6B26]">
                    {item.name}
                  </Link>
                  <p className="text-caption text-[#5A5A5A] mt-0.5 capitalize">{item.category}</p>
                  <p className="text-sm font-semibold mt-2">{formatPKR(item.price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#F0EBDC] rounded-sm">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#F0EBDC]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#F0EBDC]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[#8A8275] hover:text-[#B23A3A] p-2"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatPKR(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/shop" className="inline-flex items-center gap-2 mt-6 text-sm text-[#8A6B26] hover:gap-3 transition-all">
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-6 space-y-4">
            <h2 className="text-h4">Order Summary</h2>

            {/* Coupon */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-[#FAF8F2] rounded-sm p-3">
                  <span className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-[#8A6B26]" />
                    {couponCode} ({couponDiscount}% off)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      removeCoupon();
                      setCouponMsg(null);
                      setCouponInput("");
                    }}
                    className="text-caption text-[#8A8275] hover:text-[#B23A3A]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 text-sm bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2 outline-none focus:border-[#8A6B26] uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-[#0E0E0E] text-cream text-sm rounded-sm hover:bg-[#2A2A2A]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-caption mt-2 ${couponMsg.ok ? "text-[#2E7D5B]" : "text-[#B23A3A]"}`}>
                      {couponMsg.text}
                    </p>
                  )}
                  <p className="text-caption text-[#8A8275] mt-2">
                    Try: WELCOME10 · EID25 · FREESHIP
                  </p>
                </>
              )}
            </div>

            <div className="space-y-2 pt-4 border-t border-[#F0EBDC]">
              <div className="flex justify-between text-body-sm">
                <span className="text-[#5A5A5A]">Subtotal</span>
                <span>{formatPKR(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-body-sm text-[#2E7D5B]">
                  <span>Discount ({couponDiscount}%)</span>
                  <span>−{formatPKR(disc)}</span>
                </div>
              )}
              <div className="flex justify-between text-body-sm">
                <span className="text-[#5A5A5A]">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPKR(shipping)}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-[#F0EBDC]">
              <span className="text-h4">Total</span>
              <span className="text-h4 font-display">{formatPKR(total)}</span>
            </div>

            <Link href="/checkout" className="btn-gold w-full">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F0EBDC] text-center">
              <div>
                <p className="text-caption text-[#5A5A5A]">COD</p>
                <p className="text-caption text-[#8A8275]">available</p>
              </div>
              <div>
                <p className="text-caption text-[#5A5A5A]">Returns</p>
                <p className="text-caption text-[#8A8275]">7 days</p>
              </div>
              <div>
                <p className="text-caption text-[#5A5A5A]">WhatsApp</p>
                <p className="text-caption text-[#8A8275]">support</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
