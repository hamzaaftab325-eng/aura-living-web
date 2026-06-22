import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="surface-dark grain relative min-h-[100svh] md:min-h-screen flex flex-col"
      aria-label="Aura Living — Light, life, and living beauty"
    >
      {/* Background gradient (placeholder for hero image in Phase 2) */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #C9A84C22 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #8A6B2611 0%, transparent 50%)",
        }}
      />

      {/* Decorative gold lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      <div className="container-page relative flex-1 flex flex-col justify-center pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-overline text-[#C9A84C] mb-6 animate-[fadeInUp_800ms_ease-out]">
            ✦ Premium Home Decor · Pakistan
          </p>
          <h1 className="text-display text-white text-balance mb-6 animate-[fadeInUp_1000ms_ease-out_100ms_both]">
            Light, life, and{" "}
            <span className="italic font-light text-[#C9A84C]">living beauty</span>
            <br />
            for the home you are becoming.
          </h1>
          <p className="text-body-lg text-cream/80 max-w-xl mb-8 text-pretty animate-[fadeInUp_800ms_ease-out_300ms_both]">
            Handcrafted brass lamps from Peshawar. Living plants acclimatised for Pakistani homes. Hand-poured candles scented with saffron, oud, and mogra. Curated with care, delivered with love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_800ms_ease-out_500ms_both]">
            <Link href="/shop" className="btn-gold">
              Shop the Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-outline-gold">
              Our Story
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24 pt-12 border-t border-white/10 animate-[fadeInUp_800ms_ease-out_700ms_both]">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white mb-1">
                {badge.title}
              </h3>
              <p className="text-caption text-cream/60">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-cream/40">
          <span className="text-caption tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
