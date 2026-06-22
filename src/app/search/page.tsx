import { ContentPage } from "@/features/layout/components/content-page";
import { ProductCard } from "@/features/product/components/product-card";
import { getAllProducts } from "@/services/product/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Find the perfect lamp, plant, or candle from Aura Living.",
  alternates: { canonical: "/search" },
  robots: { index: false },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <ContentPage
      overline="Search"
      title="Find your piece."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
    >
      <div className="container-page section-y">
        <p className="text-body-sm text-[#5A5A5A]">Browse all products below, or use the search icon in the header.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {getAllProducts().map((p, idx) => (
            <ProductCard key={p.slug} product={p} priority={idx < 4} />
          ))}
        </div>
      </div>
    </ContentPage>
  );
}
