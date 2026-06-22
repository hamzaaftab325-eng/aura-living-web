"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Lock, Truck, RefreshCw, MessageCircle, Gift } from "lucide-react";
import { useCartStore } from "@/features/cart/store";
import { formatPKR } from "@/lib/format";
import { PAKISTANI_PROVINCES, MAJOR_CITIES, PAYMENT_METHODS, SHIPPING_METHODS, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

const schema = z.object({
  contact: z.object({
    fullName: z.string().min(3, "Please enter your full name"),
    phone: z.string().regex(/^(\+92|0)?3\d{2}[\s-]?\d{7}$/, "Enter a valid Pakistani mobile (e.g. 0300 1234567)"),
    email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  }),
  shipping: z.object({
    addressLine1: z.string().min(5, "Please enter your full address"),
    addressLine2: z.string().optional(),
    city: z.string().min(2, "Please enter your city"),
    province: z.string().min(1, "Select your province"),
    postalCode: z.string().regex(/^\d{5}$/, "Enter a 5-digit postal code"),
  }),
  delivery: z.object({
    method: z.enum(["standard", "express", "same-day"]),
    instructions: z.string().max(200).optional(),
  }),
  payment: z.object({
    method: z.enum(["cod", "jazzcash", "easypaisa", "card", "bank"]),
  }),
  gift: z.object({
    isGift: z.boolean(),
    giftWrap: z.enum(["signature-gold", "festive-red", "eco-kraft"]).optional(),
    note: z.string().max(200).optional(),
  }),
});

type FormData = z.infer<typeof schema>;

export function CheckoutForm() {
  const [submitted, setSubmitted] = useState(false);
  const { items, subtotal, couponDiscount, discount } = useCartStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      payment: { method: "cod" },
      delivery: { method: "standard" },
      gift: { isGift: false, giftWrap: "signature-gold" },
    },
  });

  const sub = subtotal();
  const disc = discount();
  const deliveryMethod = watch("delivery.method");
  const shippingMethod = SHIPPING_METHODS.find((m) => m.id === deliveryMethod)!;
  const shipping = sub >= FREE_SHIPPING_THRESHOLD && shippingMethod.id === "standard" ? 0 : shippingMethod.cost;
  const isGift = watch("gift.isGift");
  const giftWrapPrice = isGift ? (watch("gift.giftWrap") === "festive-red" ? 200 : watch("gift.giftWrap") === "eco-kraft" ? 100 : 150) : 0;
  const total = sub - disc + shipping + giftWrapPrice;

  const onSubmit = (data: FormData) => {
    // Mock: generate order id and go to confirmation
    const orderId = `AURA-${Date.now().toString().slice(-8)}`;
    sessionStorage.setItem("last-order", JSON.stringify({ id: orderId, data, total, items }));
    window.location.href = `/orders/${orderId}/confirmed`;
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="container-page section-y text-center">
        <h1 className="text-h1 mb-4">Your cart is empty</h1>
        <p className="text-body-lg text-[#5A5A5A] mb-6">Add something beautiful before checking out.</p>
        <a href="/shop" className="btn-gold inline-flex">Browse the collection</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-page section-y">
      <h1 className="text-h1 mb-2">Checkout</h1>
      <p className="text-body-sm text-[#5A5A5A] mb-8">
        Cash on delivery available across Pakistan. Your information is secure.
      </p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Form sections */}
        <div className="space-y-8">
          {/* Contact */}
          <section>
            <h2 className="text-h4 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-[#0E0E0E] text-caption font-bold flex items-center justify-center">1</span>
              Contact
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium mb-1">Full Name *</label>
                <input
                  {...register("contact.fullName")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="e.g. Ayesha Khan"
                />
                {errors.contact?.fullName && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.contact.fullName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Mobile Number *</label>
                <input
                  {...register("contact.phone")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="0300 1234567"
                  type="tel"
                />
                {errors.contact?.phone && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.contact.phone.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-body-sm font-medium mb-1">Email (optional)</label>
                <input
                  {...register("contact.email")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="your@email.com"
                  type="email"
                />
                {errors.contact?.email && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.contact.email.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Shipping address */}
          <section>
            <h2 className="text-h4 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-[#0E0E0E] text-caption font-bold flex items-center justify-center">2</span>
              Shipping Address
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-body-sm font-medium mb-1">Address Line 1 *</label>
                <input
                  {...register("shipping.addressLine1")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="House #, Street, Area"
                />
                {errors.shipping?.addressLine1 && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.shipping.addressLine1.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-body-sm font-medium mb-1">Address Line 2 (optional)</label>
                <input
                  {...register("shipping.addressLine2")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="Apartment, landmark, etc."
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">City *</label>
                <input
                  {...register("shipping.city")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="e.g. Karachi"
                />
                {errors.shipping?.city && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.shipping.city.message}</p>
                )}
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Province *</label>
                <select
                  {...register("shipping.province")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                >
                  <option value="">Select province</option>
                  {PAKISTANI_PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.shipping?.province && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.shipping.province.message}</p>
                )}
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Postal Code *</label>
                <input
                  {...register("shipping.postalCode")}
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="e.g. 74000"
                  maxLength={5}
                />
                {errors.shipping?.postalCode && (
                  <p className="text-caption text-[#B23A3A] mt-1">{errors.shipping.postalCode.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Delivery method */}
          <section>
            <h2 className="text-h4 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-[#0E0E0E] text-caption font-bold flex items-center justify-center">3</span>
              Delivery Method
            </h2>
            <div className="space-y-3">
              {SHIPPING_METHODS.map((method) => {
                const cost = sub >= FREE_SHIPPING_THRESHOLD && method.id === "standard" ? 0 : method.cost;
                return (
                  <label
                    key={method.id}
                    className="flex items-start gap-3 p-4 border border-[#F0EBDC] rounded-sm cursor-pointer hover:border-[#8A6B26] has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#FAF8F2]"
                  >
                    <input
                      type="radio"
                      value={method.id}
                      {...register("delivery.method")}
                      className="mt-1 accent-[#8A6B26]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{method.name}</p>
                      <p className="text-caption text-[#5A5A5A]">{method.description}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {cost === 0 ? "Free" : formatPKR(cost)}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="mt-3">
              <label className="block text-body-sm font-medium mb-1">Delivery instructions (optional)</label>
              <textarea
                {...register("delivery.instructions")}
                className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26] min-h-[80px]"
                placeholder="e.g. Leave with the guard at Gate 2"
                maxLength={200}
              />
            </div>
          </section>

          {/* Gift options */}
          <section>
            <h2 className="text-h4 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-[#0E0E0E] text-caption font-bold flex items-center justify-center">4</span>
              Gift Options
            </h2>
            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input type="checkbox" {...register("gift.isGift")} className="accent-[#8A6B26] w-4 h-4" />
              <span className="flex items-center gap-2 text-sm font-medium">
                <Gift className="w-4 h-4 text-[#8A6B26]" />
                This is a gift
              </span>
            </label>
            {isGift && (
              <div className="bg-[#FAF8F2] rounded-sm p-4 space-y-4">
                <div>
                  <label className="block text-body-sm font-medium mb-2">Gift wrap</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: "signature-gold", name: "Signature Gold", price: 150 },
                      { id: "festive-red", name: "Festive Red", price: 200 },
                      { id: "eco-kraft", name: "Eco Kraft", price: 100 },
                    ].map((wrap) => (
                      <label
                        key={wrap.id}
                        className="border border-[#F0EBDC] rounded-sm p-3 cursor-pointer hover:border-[#8A6B26] has-[:checked]:border-[#C9A84C] has-[:checked]:bg-white text-center"
                      >
                        <input
                          type="radio"
                          value={wrap.id}
                          {...register("gift.giftWrap")}
                          className="sr-only"
                        />
                        <p className="text-sm font-medium">{wrap.name}</p>
                        <p className="text-caption text-[#5A5A5A]">+{formatPKR(wrap.price)}</p>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-1">Handwritten note (max 200 chars)</label>
                  <textarea
                    {...register("gift.note")}
                    className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26] min-h-[80px]"
                    placeholder="Dear Mama, happy birthday…"
                    maxLength={200}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-h4 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-[#0E0E0E] text-caption font-bold flex items-center justify-center">5</span>
              Payment Method
            </h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className="flex items-start gap-3 p-4 border border-[#F0EBDC] rounded-sm cursor-pointer hover:border-[#8A6B26] has-[:checked]:border-[#C9A84C] has-[:checked]:bg-[#FAF8F2]"
                >
                  <input
                    type="radio"
                    value={method.id}
                    {...register("payment.method")}
                    className="mt-1 accent-[#8A6B26]"
                    defaultChecked={method.default}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{method.name} {method.default && <span className="text-caption text-[#2E7D5B]">(recommended)</span>}</p>
                    <p className="text-caption text-[#5A5A5A]">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-6 space-y-4">
            <h2 className="text-h4">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  { }
                  <img src={item.image} alt={item.name} className="w-14 h-18 object-cover rounded-sm bg-[#F0EBDC]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-caption text-[#5A5A5A]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">{formatPKR(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-[#F0EBDC] text-body-sm">
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Subtotal</span>
                <span>{formatPKR(sub)}</span>
              </div>
              {disc > 0 && (
                <div className="flex justify-between text-[#2E7D5B]">
                  <span>Discount ({couponDiscount}%)</span>
                  <span>−{formatPKR(disc)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPKR(shipping)}</span>
              </div>
              {giftWrapPrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#5A5A5A]">Gift wrap</span>
                  <span>{formatPKR(giftWrapPrice)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-[#F0EBDC]">
              <span className="text-h4">Total</span>
              <span className="text-h4 font-display">{formatPKR(total)}</span>
            </div>

            <button type="submit" className="btn-gold w-full">
              <Lock className="w-4 h-4" />
              Place Order — {formatPKR(total)}
            </button>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F0EBDC] text-center">
              <div>
                <Truck className="w-4 h-4 mx-auto text-[#8A6B26] mb-1" />
                <p className="text-caption text-[#5A5A5A]">Pay at door</p>
              </div>
              <div>
                <RefreshCw className="w-4 h-4 mx-auto text-[#8A6B26] mb-1" />
                <p className="text-caption text-[#5A5A5A]">7-day returns</p>
              </div>
              <div>
                <MessageCircle className="w-4 h-4 mx-auto text-[#8A6B26] mb-1" />
                <p className="text-caption text-[#5A5A5A]">WhatsApp help</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}
