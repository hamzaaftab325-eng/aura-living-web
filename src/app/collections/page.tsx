import { ContentPage } from "@/features/layout/components/content-page";
import { ProductCard } from "@/features/product/components/product-card";
import { mockProducts } from "@/services/product/mock";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Curated seasonal collections from Aura Living — brass lamps, indoor plants, and hand-poured candles for the Pakistani home.",
  alternates: { canonical: "/collections" },
};

const COLLECTIONS = [
  {
    slug: "monsoon-edit",
    name: "The Monsoon Edit",
    season: "June – September",
    description: "Warm light against grey-gold rain. Twelve pieces chosen for the season when Karachi softens.",
    image: "/editorial/monsoon-edit-banner-1680.webp",
  },
  {
    slug: "brass-and-linen",
    name: "Brass & Linen",
    season: "Year-round",
    description: "Our most-loved pairing — solid brass frames and natural linen shades. Quiet, warm, architectural.",
    image: "/editorial/brass-and-linen-banner-1680.webp",
  },
  {
    slug: "under-5000",
    name: "Under Rs 5,000",
    season: "Year-round",
    description: "Pieces that do not compromise on craft. Gifts, small luxuries, and starting points for a new home.",
    image: "/editorial/under-5000-banner-1680.webp",
  },
  {
    slug: "eid-gifting",
    name: "Eid Gifting",
    season: "Seasonal",
    description: "Curated for the season of giving. Festive red wrapping, handwritten notes, and pieces that become heirlooms.",
    image: "/editorial/eid-gifting-banner-1680.webp",
  },
];

export default function CollectionsPage() {
  return (
    <ContentPage
      overline="Curated"
      title="Collections"
      description="Seasonal edits and curated groupings. Each collection is a way into the catalogue — a mood, a moment, a starting point."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
    >
      <section className="container-page section-y">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#0E0E0E]"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, #C9A84C22 0%, #0E0E0E 70%)`,
                }}
              />
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-cream">
                <p className="text-overline text-[#C9A84C] mb-2">{col.season}</p>
                <h3 className="text-h2 text-white mb-3">{col.name}</h3>
                <p className="text-body-sm text-cream/80 max-w-md mb-4">{col.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] group-hover:gap-3 transition-all">
                  Explore collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
