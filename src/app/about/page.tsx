import { ContentPage } from "@/features/layout/components/content-page";
import Link from "next/link";
import { Heart, Sparkles, HandHeart, Leaf, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story — A Pakistani Home Decor Brand",
  description:
    "Aura Living was founded in Karachi to bring premium, artisanal home decor to Pakistani homes. Read about our makers, our materials, and our belief in slow, considered craft.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: HandHeart,
    title: "Made by hand, in Pakistan",
    body: "Every lamp, pot, and candle is made by a Pakistani artisan. We do not import. We do not white-label factory goods. We commission, we collaborate, and we pay fairly.",
  },
  {
    icon: Leaf,
    title: "Materials that belong to this place",
    body: "Brass from Peshawar. Terracotta from Hala. Onyx from Balochistan. Mogra from Lahore. We build with materials that have a history here, because they make homes that feel rooted.",
  },
  {
    icon: Heart,
    title: "Slow, not fast",
    body: "We launch twelve pieces a season, not two hundred. Each one is prototyped, tested, and refined. We would rather sell you one lamp you love for a decade than ten you replace in a year.",
  },
  {
    icon: ShieldCheck,
    title: "Cash on delivery, always",
    body: "Seventy percent of Pakistani e-commerce is COD. We will never take that away. Trust is built when you let the customer inspect before they pay — so we do.",
  },
  {
    icon: Sparkles,
    title: "The home you are becoming",
    body: "A home is not built in a day. It is built over years, one chosen piece at a time. We exist for that process — the slow assembly of a space that feels unmistakably yours.",
  },
];

export default function AboutPage() {
  return (
    <ContentPage
      overline="Our Story"
      title="Built in Karachi, for the homes of Pakistan."
      description="Aura Living began with a frustration and a hope: that Pakistani homes deserved better than imported fast-furniture, and that Pakistani artisans deserved a market that valued their craft."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
    >
      {/* Founding story */}
      <section className="container-narrow section-y">
        <div className="prose-aura">
          <h2 className="text-h2 mb-6">Why we started</h2>
          <div className="space-y-4 text-body-lg text-[#2A2A2A] text-pretty">
            <p>
              Three years ago, our founder moved into a new apartment in Karachi and tried to furnish it. The options were grim. Imported furniture from Daraz arrived broken or off-gassing formaldehyde. The brass lamps she remembered from her grandmother's home had no modern equivalent — the artisans were still in Peshawar, but no one was commissioning them for a contemporary market.
            </p>
            <p>
              She found the artisans herself. Drove to Hala for terracotta. Found a candle-maker in Korangi who had been pouring for thirty years and was about to close his workshop. Found a plant grower outside Malir who acclimatised tropicals better than any nursery in the city.
            </p>
            <p>
              The first lamps she commissioned were for her own home. Then her friends wanted them. Then their friends. The pattern was clear: Pakistani customers would pay a fair price for Pakistani-made quality, if someone would curate it, photograph it honestly, and deliver it with care.
            </p>
            <p>
              That someone is us. Aura Living is the brand we wished existed — premium without being foreign, curated without being snobby, Pakistani without being kitsch. We are not a marketplace. We are a single-brand store, which means every piece is something we chose.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="surface-cream section-y border-t border-[#F0EBDC]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-overline text-gold mb-3">What We Believe</p>
            <h2 className="text-h2 text-balance">Five principles, non-negotiable.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="bg-white border border-[#F0EBDC] rounded-sm p-6 md:p-8">
                <p.icon className="w-8 h-8 text-[#C9A84C] mb-4" />
                <h3 className="text-h4 mb-3">{p.title}</h3>
                <p className="text-body-sm text-[#2A2A2A] leading-relaxed text-pretty">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="container-narrow section-y">
        <h2 className="text-h2 mb-6">How we work</h2>
        <div className="space-y-8">
          <div className="grid md:grid-cols-[80px_1fr] gap-4">
            <p className="text-h3 text-[#C9A84C] font-display">01</p>
            <div>
              <h3 className="text-h4 mb-2">Sourcing</h3>
              <p className="text-body-sm text-[#2A2A2A] text-pretty">
                We travel to find our makers. Peshawar for brass. Hala for terracotta. Chakwal for beeswax. We do not buy through middlemen. We sit in the workshops, drink the chai, and commission pieces directly. The maker sets the price — we do not haggle.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-[80px_1fr] gap-4">
            <p className="text-h3 text-[#C9A84C] font-display">02</p>
            <div>
              <h3 className="text-h4 mb-2">Craft</h3>
              <p className="text-body-sm text-[#2A2A2A] text-pretty">
                Each piece is made in small batches — usually ten to twenty at a time. A brass lamp takes three days per piece. A candle batch takes a day. We do not rush this. The slowness is the quality.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-[80px_1fr] gap-4">
            <p className="text-h3 text-[#C9A84C] font-display">03</p>
            <div>
              <h3 className="text-h4 mb-2">Delivery</h3>
              <p className="text-body-sm text-[#2A2A2A] text-pretty">
                We pack by hand in our Karachi studio. Fragile pieces get double-wrapped. Plants ship in custom boxes that hold the pot in place. Every package includes a handwritten thank-you — because the transaction is not the point. The relationship is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark grain section-y text-center">
        <div className="container-narrow">
          <h2 className="text-h1 text-white text-balance mb-6">
            Build the home you are becoming.
          </h2>
          <p className="text-body-lg text-cream/80 mb-8 text-pretty">
            Browse the collection. Or write to us — we love helping people find the right piece, even if it is not from our store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-gold">Shop the Collection</Link>
            <Link href="/contact" className="btn-outline-gold">Get in Touch</Link>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
