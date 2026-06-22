import { ContentPage } from "@/features/layout/components/content-page";
import { ProductCard } from "@/features/product/components/product-card";
import { mockProducts } from "@/services/product/mock";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${name} — Aura Living Collection`,
    description: `Explore the ${name} collection from Aura Living — curated lamps, plants, and candles for the Pakistani home.`,
    alternates: { canonical: `/collections/${slug}` },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  // For the monsoon-edit collection, show a curated subset
  const products = slug === "under-5000"
    ? mockProducts.filter((p) => p.price < 5000).slice(0, 8)
    : slug === "brass-and-linen"
    ? mockProducts.filter((p) => p.category === "lamps").slice(0, 8)
    : mockProducts.slice(0, 8);

  return (
    <ContentPage
      overline="Collection"
      title={name}
      description="A curated selection from the Aura Living catalogue. Each piece chosen for how it belongs to the others."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Collections", href: "/collections" },
        { label: name },
      ]}
    >
      <section className="container-page section-y">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, idx) => (
            <ProductCard key={p.slug} product={p} priority={idx < 4} />
          ))}
        </div>
      </section>
    </ContentPage>
  );
}
