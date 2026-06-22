import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="relative min-h-[88svh] md:min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#FAF8F2]"
      aria-label="Aura Living — Light, life, and living beauty"
    >
      {/* Background lifestyle image — lighter, airier */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hero-lifestyle-1920.png"
          alt="Warm candlelit Pakistani living room with brass lamp, monstera plant, and cream linen sofa at golden hour"
          className="w-full h-full object-cover"
        />
        {/* Light gradient overlay — soft, airy, lets image breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/40 via-transparent to-[#FAF8F2]/60" />
        {/* Subtle left-side scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F2]/50 via-transparent to-transparent md:from-[#FAF8F2]/30" />
      </div>

      {/* Carousel arrows (decorative) */}
      <button
        type="button"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-[#0E0E0E]/10 text-[#0E0E0E] hover:bg-white/70 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-[#0E0E0E]/10 text-[#0E0E0E] hover:bg-white/70 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Centered content — dark text on light overlay for airy feel */}
      <div className="container-page relative z-10 text-center py-32">
        <p className="text-overline text-[#8A6B26] mb-6 tracking-[0.2em]">
          ✦ Premium Home Decor · Pakistan
        </p>
        <h1 className="text-display text-[#0A0A0A] text-balance mb-6 max-w-4xl mx-auto">
          Light, life, and{" "}
          <span className="italic font-light text-[#8A6B26]">living beauty</span>
        </h1>
        <p className="text-body-lg text-[#2A2A2A] max-w-xl mx-auto mb-10 text-pretty">
          Handcrafted brass lamps from Peshawar. Living plants acclimatised for Pakistani homes. Hand-poured candles scented with saffron, oud, and mogra.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-gold">
            Shop the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/about" className="btn-outline-gold">
            Our Story
          </Link>
        </div>
      </div>

      {/* Trust badges bar — light, not dark */}
      <div className="absolute bottom-0 inset-x-0 bg-[#FAF8F2]/80 backdrop-blur-sm border-t border-[#F0EBDC] z-10">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.title} className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-[#0A0A0A]">
                  {badge.title}
                </h3>
                <p className="text-caption text-[#5A5A5A] hidden sm:block">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
