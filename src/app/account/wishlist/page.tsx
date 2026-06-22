import { ContentPage } from "@/features/layout/components/content-page";
import { ProductCard } from "@/features/product/components/product-card";
import { mockProducts } from "@/services/product/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "Pieces you have saved for later.",
  alternates: { canonical: "/account/wishlist" },
  robots: { index: false },
};

export default function WishlistPage() {
  // Mock: show first 4 products as "wishlisted"
  const wishlist = mockProducts.slice(0, 4);

  return (
    <ContentPage
      overline="My Account"
      title="My Wishlist"
      description="Pieces you have saved. Tap the heart on any product to add it here."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Wishlist" }]}
    >
      <section className="container-page section-y">
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-h4 mb-2">Your wishlist is empty</p>
            <p className="text-body-sm text-[#5A5A5A]">Tap the heart on any product to save it for later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((p, idx) => (
              <ProductCard key={p.slug} product={p} priority={idx < 2} />
            ))}
          </div>
        )}
      </section>
    </ContentPage>
  );
}
