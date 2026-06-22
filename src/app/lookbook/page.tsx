import { ContentPage } from "@/features/layout/components/content-page";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lookbook — Editorial Home Styling",
  description: "Editorial styling stories from Aura Living — how to pair brass lamps with living plants, how to layer candlelight, how to make a Pakistani home feel like yours.",
  alternates: { canonical: "/lookbook" },
};

const STORIES = [
  {
    slug: "monsoon-living-room",
    title: "The Monsoon Living Room",
    excerpt: "When the rains come to Karachi, the light goes grey-gold. Here is how we style for that mood — warm candlelight, deep greens, brass that catches the low clouds.",
    tag: "Seasonal",
    height: "tall",
  },
  {
    slug: "brass-and-terracotta",
    title: "Brass & Terracotta",
    excerpt: "Two materials that have been worked in Pakistan for centuries. Paired together, they make a room feel rooted.",
    tag: "Materials",
    height: "short",
  },
  {
    slug: "the-reading-corner",
    title: "The Reading Corner",
    excerpt: "A single chair, a single lamp, a single plant. The smallest room in the house, done well.",
    tag: "Small Spaces",
    height: "short",
  },
  {
    slug: "eid-table",
    title: "The Eid Table",
    excerpt: "Candles, brass, and mogra. How to set a table that holds the weight of a celebration.",
    tag: "Festive",
    height: "tall",
  },
  {
    slug: "first-apartment",
    title: "The First Apartment",
    excerpt: "Five pieces that do the work of fifty. For the Karachi flat, the Lahore studio, the Islamabad one-bed.",
    tag: "Starter",
    height: "short",
  },
  {
    slug: "veranda-evenings",
    title: "Veranda Evenings",
    excerpt: "The Pakistani veranda in summer — cane, cotton, candlelight that survives the breeze.",
    tag: "Outdoor",
    height: "tall",
  },
];

export default function LookbookPage() {
  return (
    <ContentPage
      overline="Editorial"
      title="Lookbook"
      description="Styling stories from the Aura Living studio. How the pieces live in real Pakistani homes — not styled sets, but rooms that get used."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Lookbook" }]}
    >
      <section className="container-page section-y">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((story) => (
            <Link
              key={story.slug}
              href={`/lookbook/${story.slug}`}
              className={`group relative rounded-sm overflow-hidden bg-[#0E0E0E] ${
                story.height === "tall" ? "aspect-[2/3]" : "aspect-[4/3]"
              }`}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, #C9A84C22 0%, #0E0E0E 65%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-cream">
                <p className="text-overline text-[#C9A84C] mb-2">{story.tag}</p>
                <h3 className="text-h3 text-white mb-2">{story.title}</h3>
                <p className="text-body-sm text-cream/80 line-clamp-2">{story.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] mt-3 group-hover:gap-3 transition-all">
                  View story →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
