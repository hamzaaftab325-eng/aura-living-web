import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

export function FurnishEveryCorner() {
  return (
    <section className="surface-cream section-y border-t border-[#F0EBDC]" aria-label="Furnish every corner">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <p className="text-overline text-gold mb-3">Our Collections</p>
              <h2 className="text-h1 text-balance mb-6">
                Every corner, considered.
              </h2>
              <p className="text-body-lg text-[#5A5A5A] mb-8 text-pretty max-w-lg">
                From a single bedside lamp to a full lounge refresh, our collections cover every corner of a Pakistani home. Three categories, each chosen with care — brass that lasts decades, plants that thrive here, candles scented with home.
              </p>
            </Reveal>

            {/* Vertical category menu */}
            <Reveal delay={0.15}>
              <div className="border-t border-[#F0EBDC]">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}`}
                    className="group flex items-center justify-between py-5 border-b border-[#F0EBDC] hover:bg-[#FAF8F2] transition-colors -mx-4 px-4"
                  >
                    <div>
                      <h3 className="text-h4 font-display text-[#0A0A0A] group-hover:text-[#8A6B26] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-body-sm text-[#5A5A5A]">{cat.tagline}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#8A8275] group-hover:text-[#8A6B26] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Link href="/collections" className="btn-gold mt-8 inline-flex">
                Explore Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          {/* Right: image with parallax */}
          <div className="order-1 lg:order-2 relative">
            <Reveal y={40}>
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden bg-[#F0EBDC]">
                <Parallax speed={-20} className="absolute inset-0 scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/furnish-every-corner-1200.png"
                    alt="Cream and brass living room scene with ceramic vases, candle, and monstera plant in warm natural light"
                    className="w-full h-full object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>
            {/* Floating accent badge */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 bg-[#0A0A0A] text-[#FAF8F2] p-6 rounded-sm max-w-[200px] hidden md:block">
              <p className="text-h3 font-display text-[#C9A84C] mb-1">48</p>
              <p className="text-caption text-cream/70">curated pieces, each made in Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
