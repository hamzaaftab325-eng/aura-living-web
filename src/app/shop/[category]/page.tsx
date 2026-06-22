import { notFound } from "next/navigation";
import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { PageHeader } from "@/features/layout/components/page-header";
import { ProductGrid } from "@/features/product/components/product-grid";
import { getProductsByCategory } from "@/services/product/mock";
import { CATEGORIES } from "@/lib/constants";
import type { Metadata } from "next";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} — ${cat.tagline}`,
    description: cat.description,
    alternates: { canonical: `/shop/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();
  const products = getProductsByCategory(category);

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageHeader
          overline={`Shop · ${cat.name}`}
          title={cat.name}
          description={cat.description}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: cat.name },
          ]}
        />
        <ProductGrid products={products} category={cat.name} />
      </main>
      <SiteFooter />
      <WhatsAppFAB />
      <CartDrawer />
    </>
  );
}
