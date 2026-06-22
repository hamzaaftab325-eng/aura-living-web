import { ContentPage } from "@/features/layout/components/content-page";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} — Lookbook`,
    description: `An editorial styling story from Aura Living: ${title}.`,
    alternates: { canonical: `/lookbook/${slug}` },
  };
}

export default async function LookbookStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <ContentPage
      overline="Lookbook"
      title={title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Lookbook", href: "/lookbook" },
        { label: title },
      ]}
    >
      <section className="container-narrow section-y">
        <div className="space-y-6 text-body-lg text-[#2A2A2A] text-pretty">
          <p>
            This is a styling story — the kind of piece we write when we want to think about how a room comes together, rather than just what is in it. The full editorial will be here soon. For now, browse the collection and imagine.
          </p>
          <p>
            Every lookbook story is built around a real Pakistani home — a Karachi apartment, a Lahore haveli, an Islamabad one-bed. We photograph the pieces in the rooms they were meant for, lit by the light that actually falls there, and we tell you honestly what works and what does not.
          </p>
        </div>

        <div className="mt-12 p-8 md:p-12 bg-[#0E0E0E] rounded-sm text-center">
          <h2 className="text-h2 text-white mb-4">Browse the full collection</h2>
          <p className="text-body-sm text-cream/70 mb-6 max-w-md mx-auto">
            Forty-eight pieces across three categories. Each one chosen for how it lives in a Pakistani home.
          </p>
          <Link href="/shop" className="btn-gold inline-flex">
            Shop All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </ContentPage>
  );
}
