import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="relative min-h-[90svh] md:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0E0E0E]"
      aria-label="Aura Living — Light, life, and living beauty"
    >
      {/* Background lifestyle image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hero-lifestyle-1920.png"
          alt="Warm candlelit Pakistani living room with brass lamp, monstera plant, and cream linen sofa at golden hour"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/60 via-[#0E0E0E]/30 to-[#0E0E0E]/70" />
      </div>

      {/* Carousel arrows (decorative — single hero for now) */}
      <button
        type="button"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cream hover:bg-white/20 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cream hover:bg-white/20 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Centered content */}
      <div className="container-page relative z-10 text-center text-cream py-32">
        <p className="text-overline text-[#C9A84C] mb-6 tracking-[0.2em]">
          ✦ Premium Home Decor · Pakistan
        </p>
        <h1 className="text-display text-white text-balance mb-6 max-w-4xl mx-auto">
          Light, life, and{" "}
          <span className="italic font-light text-[#C9A84C]">living beauty</span>
        </h1>
        <p className="text-body-lg text-cream/85 max-w-xl mx-auto mb-10 text-pretty">
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

      {/* Trust badges bar at bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-[#0E0E0E]/80 backdrop-blur-sm border-t border-white/10 z-10">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.title} className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-white">
                  {badge.title}
                </h3>
                <p className="text-caption text-cream/60 hidden sm:block">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
