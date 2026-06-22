import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { Hero } from "@/features/home/components/hero";
import { AsFeaturedIn } from "@/features/home/components/as-featured-in";
import { BestsellerCarousel } from "@/features/home/components/bestseller-carousel";
import { FurnishEveryCorner } from "@/features/home/components/furnish-every-corner";
import { EditorialBanner } from "@/features/home/components/editorial-banner";
import { Testimonials } from "@/features/home/components/testimonials";
import { NewsletterCTA } from "@/features/home/components/newsletter-cta";
import { getBestsellers } from "@/services/product/mock";

export default function HomePage() {
  const bestsellers = getBestsellers(8);

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <AsFeaturedIn />
        <BestsellerCarousel products={bestsellers} />
        <FurnishEveryCorner />
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
