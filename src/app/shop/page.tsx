import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { PageHeader } from "@/features/layout/components/page-header";
import { ProductGrid } from "@/features/product/components/product-grid";
import { getAllProducts } from "@/services/product/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products — Lamps, Plants & Candles",
  description:
    "Browse the full Aura Living collection of handcrafted brass lamps, indoor plants for Pakistani homes, and hand-poured soy candles. Cash on delivery available across Pakistan.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHeader
          overline="The Collection"
          title="Every piece, chosen with intention."
          description="Forty-eight pieces across three categories. Each one made by Pakistani artisans, sourced from Pakistani materials, or grown in Pakistani soil. No filler. No fast-furniture."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        />
        <ProductGrid products={products} />
      </main>
      <SiteFooter />
      <WhatsAppFAB />
      <CartDrawer />
    </>
  );
}
