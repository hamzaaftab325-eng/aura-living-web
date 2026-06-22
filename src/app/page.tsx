import { Hero } from "@/features/home/components/hero";
import { CategoryTiles } from "@/features/home/components/category-tiles";
import { Bestsellers } from "@/features/home/components/bestsellers";
import { EditorialBanner } from "@/features/home/components/editorial-banner";
import { Testimonials } from "@/features/home/components/testimonials";
import { NewsletterCTA } from "@/features/home/components/newsletter-cta";
import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <CategoryTiles />
        <Bestsellers />
        <EditorialBanner />
        <Testimonials />
        <NewsletterCTA />
      </main>
      <SiteFooter />
      <WhatsAppFAB />
      <CartDrawer />
    </>
  );
}
