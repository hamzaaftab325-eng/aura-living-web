import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout with cash on delivery, JazzCash, Easypaisa, or card.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutRoute() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-20">
        <CheckoutForm />
      </main>
      <SiteFooter />
      <CartDrawer />
      {/* WhatsApp FAB hidden on checkout per §12.4 */}
    </>
  );
}
