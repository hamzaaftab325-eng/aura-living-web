import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History",
  description: "Your past orders from Aura Living.",
  alternates: { canonical: "/account/orders" },
  robots: { index: false },
};

const ORDERS = [
  { id: "AURA-12345678", date: "10 June 2026", status: "Delivered", total: 12450, items: 2, products: "Brass Lotus Lamp, Saffron & Oud Candle" },
  { id: "AURA-12345677", date: "2 May 2026", status: "Delivered", total: 8499, items: 1, products: "Monstera Deliciosa — Medium" },
  { id: "AURA-12345676", date: "15 April 2026", status: "Delivered", total: 6499, items: 3, products: "Snake Plant, Mogra Candle, Cardamom Candle" },
  { id: "AURA-12345675", date: "20 March 2026", status: "Delivered", total: 14999, items: 1, products: "Cane Weave Floor Lamp" },
];

export default function OrdersPage() {
  return (
    <ContentPage
      overline="My Account"
      title="Order History"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Orders" }]}
    >
      <section className="container-page section-y">
        <div className="space-y-4">
          {ORDERS.map((order) => (
            <div key={order.id} className="bg-white border border-[#F0EBDC] rounded-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm font-mono font-semibold text-[#0A0A0A]">{order.id}</p>
                  <p className="text-caption text-[#5A5A5A] mt-1">Placed on {order.date}</p>
                </div>
                <span className="px-3 py-1 bg-[#2E7D5B]/10 text-[#2E7D5B] text-caption font-medium rounded-sm self-start">
                  {order.status}
                </span>
              </div>
              <div className="pt-4 border-t border-[#F0EBDC]">
                <p className="text-body-sm text-[#2A2A2A] mb-2">{order.products}</p>
                <p className="text-caption text-[#5A5A5A]">{order.items} item{order.items > 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F0EBDC]">
                <span className="text-base font-semibold">Rs {order.total.toLocaleString("en-PK")}</span>
                <a href="/account/orders" className="text-sm text-[#8A6B26] hover:underline">View details →</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
