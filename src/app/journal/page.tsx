import { ContentPage } from "@/features/layout/components/content-page";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — Care Tips, Stories, and Thoughts",
  description: "The Aura Living journal — how to care for your plants in Karachi's climate, how to clean brass, the stories behind our makers, and occasional thoughts on what makes a house a home.",
  alternates: { canonical: "/journal" },
};

const POSTS = [
  {
    slug: "caring-for-monstera-in-karachi",
    title: "How to keep a Monstera alive in Karachi's climate",
    excerpt: "Karachi's humidity and load-shedding-driven temperature swings are not what a monstera is used to. Here is what actually works — from someone who has killed three and kept four.",
    date: "June 2026",
    readTime: "6 min read",
    category: "Plant Care",
  },
  {
    slug: "the-brass-workers-of-peshawar",
    title: "The brass workers of Peshawar",
    excerpt: "A visit to the workshop in Babu Mohallah where our Lotus lamp is hammered into shape. Three generations, one workshop, and a craft that refuses to die.",
    date: "May 2026",
    readTime: "8 min read",
    category: "Makers",
  },
  {
    slug: "why-we-pour-soy-not-paraffin",
    title: "Why we pour soy wax, not paraffin",
    excerpt: "Paraffin is cheaper, easier, and what most candles are made of. We do not use it. Here is the chemistry and the ethics behind that decision.",
    date: "May 2026",
    readTime: "5 min read",
    category: "Behind the Craft",
  },
  {
    slug: "lighting-a-room-the-warm-way",
    title: "Lighting a room the warm way",
    excerpt: "2700K. It is the number on every bulb we recommend, and the reason our lamps look the way they do. A short guide to light temperature for Pakistani homes.",
    date: "April 2026",
    readTime: "4 min read",
    category: "Styling",
  },
  {
    slug: "the-smell-of-mogra",
    title: "The smell of mogra",
    excerpt: "Why we spent a year trying to capture the scent of Arabian jasmine in a candle, and why it is harder than you would think.",
    date: "April 2026",
    readTime: "6 min read",
    category: "Scents",
  },
  {
    slug: "a-lahore-haveli-restored",
    title: "A Lahore haveli, slowly restored",
    excerpt: "We visited a family restoring a 19th-century haveli in the Walled City. They furnished it with our lamps, their grandmother's brass, and a lot of patience.",
    date: "March 2026",
    readTime: "10 min read",
    category: "Homes",
  },
];

export default function JournalPage() {
  return (
    <ContentPage
      overline="The Journal"
      title="Stories from the studio."
      description="Care tips that actually work in Pakistan. Maker stories. The chemistry of candles. Occasional thoughts on what makes a house a home. Written by us, for you."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
    >
      <section className="container-page section-y">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group bg-white border border-[#F0EBDC] rounded-sm overflow-hidden hover:border-[#C9A84C] transition-colors"
            >
              <div className="aspect-[3/2] bg-[#F0EBDC] relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at center, #C9A84C22 0%, #F0EBDC 70%)`,
                  }}
                />
                <span className="absolute top-3 left-3 bg-[#0E0E0E] text-cream text-caption font-medium px-2 py-1 rounded-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-caption text-[#8A8275] mb-2">
                  {post.date} · {post.readTime}
                </p>
                <h3 className="text-h4 mb-2 group-hover:text-[#8A6B26] transition-colors">
                  {post.title}
                </h3>
                <p className="text-body-sm text-[#5A5A5A] line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
