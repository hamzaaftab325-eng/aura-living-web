import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-[70vh] flex items-center justify-center pt-24 md:pt-28">
        <div className="container-narrow text-center">
          <p className="text-display font-display text-[#C9A84C]/30 mb-4">404</p>
          <p className="text-overline text-gold mb-3">Lost in the dark</p>
          <h1 className="text-h1 mb-4 text-balance">This page has gone dark.</h1>
          <p className="text-body-lg text-[#5A5A5A] mb-8 max-w-md mx-auto text-pretty">
            The page you are looking for is not here — perhaps it was moved, or the link is broken. Let us get you back to the light.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-gold">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="btn-outline-gold">
              Shop the Collection
            </Link>
          </div>
          <p className="text-body-sm text-[#8A8275] mt-8">
            Or message us on WhatsApp — we will help you find what you are looking for.
          </p>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFAB />
      <CartDrawer />
    </>
  );
}
