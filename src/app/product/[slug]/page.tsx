import { notFound } from "next/navigation";
import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { PageHeader } from "@/features/layout/components/page-header";
import { ProductDetail } from "@/features/product/components/product-detail";
import { ProductCard } from "@/features/product/components/product-card";
import { getProductBySlug, getRelatedProducts, mockProducts } from "@/services/product/mock";
import type { Metadata } from "next";

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.shortDescription}`,
    description: product.shortDescription,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} — Aura Living`,
      description: product.shortDescription,
      images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(slug, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.slug,
    category: product.category,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: "Aura Living" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "PKR",
      availability:
        product.inventory.status === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Aura Living" },
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.average,
          reviewCount: product.rating.count,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <SiteHeader />
      <main id="main-content">
        <PageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/shop/${product.category}` },
            { label: product.name },
          ]}
          title=""
        />
        <ProductDetail product={product} />

        {related.length > 0 && (
          <section className="surface-cream section-y border-t border-[#F0EBDC]">
            <div className="container-page">
              <div className="text-center max-w-xl mx-auto mb-10">
                <p className="text-overline text-gold mb-3">You may also like</p>
                <h2 className="text-h2">Complete the look</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {related.map((p, idx) => (
                  <ProductCard key={p.slug} product={p} priority={idx < 2} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
      <WhatsAppFAB />
      <CartDrawer />
    </>
  );
}
