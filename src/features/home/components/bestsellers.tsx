import { getBestsellers } from "@/services/product/mock";
import { ProductCard } from "@/features/product/components/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Bestsellers() {
  const products = getBestsellers(8);

  return (
    <section className="surface-cream section-y border-t border-[#F0EBDC]" aria-label="Bestselling products">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
          <div className="max-w-xl">
            <p className="text-overline text-gold mb-3">Most Loved</p>
            <h2 className="text-h2 text-balance">
              The pieces our customers keep coming back for.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#8A6B26] hover:gap-3 transition-all"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.slug} product={product} priority={idx < 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
