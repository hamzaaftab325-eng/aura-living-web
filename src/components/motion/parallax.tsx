"use client";

/* ============================================================================
   Parallax — GSAP ScrollTrigger scroll-linked translation
   Source: Architecture Plan v1.1 §6.2, §6.5
   - GPU-only (transform, never layout props)
   - speed: negative = moves up slower than scroll (bg), 0 = pinned
   - Reduced-motion: no effect
   ============================================================================ */

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // -50 (bg) to 0 (foreground); default -30
  className?: string;
}

export function Parallax({ children, speed = -30, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.to(ref.current, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: ref, dependencies: [reduced, speed] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
