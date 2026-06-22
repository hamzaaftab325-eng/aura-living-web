import { ContentPage } from "@/features/layout/components/content-page";
import Link from "next/link";
import { Package, Heart, MapPin, Settings, LogOut, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your Aura Living account dashboard.",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

const NAV = [
  { label: "Overview", href: "/account", icon: Package },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

const RECENT_ORDERS = [
  { id: "AURA-12345678", date: "10 June 2026", status: "Delivered", total: 12450, items: 2 },
  { id: "AURA-12345677", date: "2 May 2026", status: "Delivered", total: 8499, items: 1 },
  { id: "AURA-12345676", date: "15 April 2026", status: "Delivered", total: 6499, items: 3 },
];

export default function AccountPage() {
  return (
    <ContentPage
      overline="My Account"
      title="Salam, welcome back."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account" }]}
    >
      <section className="container-page section-y">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <nav className="space-y-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-[#2A2A2A] hover:bg-[#FAF8F2] hover:text-[#8A6B26] transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <button className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-[#B23A3A] hover:bg-[#FAF8F2] w-full">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#F0EBDC] rounded-sm p-5">
                <p className="text-h2 font-display text-[#C9A84C]">12</p>
                <p className="text-body-sm text-[#5A5A5A]">Orders placed</p>
              </div>
              <div className="bg-white border border-[#F0EBDC] rounded-sm p-5">
                <p className="text-h2 font-display text-[#C9A84C]">Rs 84,500</p>
                <p className="text-body-sm text-[#5A5A5A]">Total spent</p>
              </div>
              <div className="bg-white border border-[#F0EBDC] rounded-sm p-5">
                <p className="text-h2 font-display text-[#C9A84C]">8</p>
                <p className="text-body-sm text-[#5A5A5A]">Items in wishlist</p>
              </div>
            </div>

            {/* Recent orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-h4">Recent Orders</h2>
                <Link href="/account/orders" className="text-sm text-[#8A6B26] hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="bg-white border border-[#F0EBDC] rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-mono font-semibold">{order.id}</p>
                      <p className="text-caption text-[#5A5A5A]">{order.date} · {order.items} items</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-[#2E7D5B]/10 text-[#2E7D5B] text-caption font-medium rounded-sm">
                        {order.status}
                      </span>
                      <span className="text-sm font-semibold">Rs {order.total.toLocaleString("en-PK")}</span>
                      <Link href="/account/orders" className="text-sm text-[#8A6B26] hover:underline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
