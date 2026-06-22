"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Package, Truck, Calendar, ArrowRight } from "lucide-react";
import { formatPKR } from "@/lib/format";

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<{ items: any[]; total: number; data: any } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("last-order");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setOrder({ items: parsed.items || [], total: parsed.total || 0, data: parsed.data || {} });
      } catch {}
    }
  }, []);

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container-page section-y">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2E7D5B]/10 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-[#2E7D5B]" />
        </div>
        <p className="text-overline text-gold mb-3">Order Confirmed</p>
        <h1 className="text-h1 mb-4">
          Thank you{order?.data?.contact?.fullName ? `, ${order.data.contact.fullName.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-body-lg text-[#5A5A5A] mb-2 text-pretty">
          Your order has been received and is being prepared with care.
        </p>
        <p className="text-body-sm text-[#8A8275] mb-8">
          Order number: <span className="font-mono font-semibold text-[#0A0A0A]">{orderId}</span>
        </p>
      </div>

      {order && (
        <div className="max-w-2xl mx-auto bg-white border border-[#F0EBDC] rounded-sm p-6 mb-8">
          <h2 className="text-h4 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-3">
                { }
                <img src={item.image} alt={item.name} className="w-14 h-18 object-cover rounded-sm bg-[#F0EBDC]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-caption text-[#5A5A5A]">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">{formatPKR(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 border-t border-[#F0EBDC]">
            <span className="text-h4">Total</span>
            <span className="text-h4 font-display">{formatPKR(order.total)}</span>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm p-4 text-center">
          <Package className="w-6 h-6 mx-auto text-[#8A6B26] mb-2" />
          <p className="text-sm font-semibold">Preparing</p>
          <p className="text-caption text-[#5A5A5A]">Within 24 hours</p>
        </div>
        <div className="bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm p-4 text-center">
          <Truck className="w-6 h-6 mx-auto text-[#8A6B26] mb-2" />
          <p className="text-sm font-semibold">On the way</p>
          <p className="text-caption text-[#5A5A5A]">3–5 business days</p>
        </div>
        <div className="bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm p-4 text-center">
          <Calendar className="w-6 h-6 mx-auto text-[#8A6B26] mb-2" />
          <p className="text-sm font-semibold">Delivery by</p>
          <p className="text-caption text-[#5A5A5A]">
            {estimatedDelivery.toLocaleDateString("en-PK", { day: "numeric", month: "long" })}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/account/orders" className="btn-gold">
          Track Order
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/shop" className="btn-outline-gold">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
