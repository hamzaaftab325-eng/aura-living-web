import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { CartPage } from "@/features/cart/components/cart-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the pieces in your Aura Living cart.",
  alternates: { canonical: "/cart" },
};

export default function CartRoute() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-20">
        <CartPage />
      </main>
      <SiteFooter />
      <CartDrawer />
      {/* WhatsApp FAB intentionally hidden on cart-related pages per §12.4 */}
    </>
  );
}
