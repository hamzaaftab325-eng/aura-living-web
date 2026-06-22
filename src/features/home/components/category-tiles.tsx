import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export function CategoryTiles() {
  return (
    <section className="surface-cream section-y" aria-label="Shop by category">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-overline text-gold mb-3">Our Collections</p>
          <h2 className="text-h2 text-balance">
            Three categories, each chosen with care.
          </h2>
          <p className="text-body-lg text-[#5A5A5A] mt-4 text-pretty">
            We do not sell everything. We sell lamps that cast the right light, plants that thrive in Pakistani homes, and candles scented with the smells of this place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((category, idx) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative aspect-[4/3] md:aspect-[3/4] rounded-sm overflow-hidden bg-[#F0EBDC]"
            >
              { }
              <img
                src={category.image}
                alt={`${category.name} — ${category.tagline}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-cream">
                <p className="text-overline text-[#C9A84C] mb-2 opacity-90">
                  0{idx + 1} · {category.name}
                </p>
                <h3 className="text-h3 text-white mb-2">{category.name}</h3>
                <p className="text-body-sm text-cream/80 mb-4 max-w-xs">
                  {category.tagline}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A84C] group-hover:gap-3 transition-all">
                  Shop {category.name}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
