"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const container = reduced
    ? undefined
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      };
  const item = reduced
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
      };

  return (
    <section
      className="relative min-h-[88svh] md:min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#FAF8F2]"
      aria-label="Aura Living — Light, life, and living beauty"
    >
      {/* Background lifestyle image with parallax feel */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? undefined : { scale: 1.08 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/hero-lifestyle-1920.png"
          alt="Warm candlelit Pakistani living room with brass lamp, monstera plant, and cream linen sofa at golden hour"
          className="w-full h-full object-cover"
        />
        {/* Light gradient overlay — soft, airy */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/40 via-transparent to-[#FAF8F2]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F2]/50 via-transparent to-transparent md:from-[#FAF8F2]/30" />
      </motion.div>

      {/* Carousel arrows (decorative) */}
      <button
        type="button"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-[#0E0E0E]/10 text-[#0E0E0A] hover:bg-white/70 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-[#0E0E0E]/10 text-[#0A0A0A] hover:bg-white/70 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Centered content — staggered entrance */}
      <motion.div
        className="container-page relative z-10 text-center py-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-overline text-[#8A6B26] mb-6 tracking-[0.2em]"
          variants={item}
        >
          ✦ Premium Home Decor · Pakistan
        </motion.p>
        <motion.h1
          className="text-display text-[#0A0A0A] text-balance mb-6 max-w-4xl mx-auto"
          variants={item}
        >
          Light, life, and{" "}
          <span className="italic font-light text-[#8A6B26]">living beauty</span>
        </motion.h1>
        <motion.p
          className="text-body-lg text-[#2A2A2A] max-w-xl mx-auto mb-10 text-pretty"
          variants={item}
        >
          Handcrafted brass lamps from Peshawar. Living plants acclimatised for Pakistani homes. Hand-poured candles scented with saffron, oud, and mogra.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={item}
        >
          <Link href="/shop" className="btn-gold">
            Shop the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/about" className="btn-outline-gold">
            Our Story
          </Link>
        </motion.div>
      </motion.div>

      {/* Trust badges bar — light, fades in last */}
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-[#FAF8F2]/80 backdrop-blur-sm border-t border-[#F0EBDC] z-10"
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
      >
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
      </motion.div>
    </section>
  );
}
