"use client";

/* ============================================================================
   Marquee — infinite horizontal scroll (testimonials)
   Source: Architecture Plan v1.1 §6.2, §7.1.2
   - GSAP timeline, seamless loop
   - Pauses on hover
   - Reduced-motion: static (renders children once, no scroll)
   ============================================================================ */

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds per loop; default 40
  className?: string;
}

export function Marquee({ children, speed = 40, className }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !trackRef.current || !containerRef.current) return;

      const track = trackRef.current;
      const trackWidth = track.scrollWidth / 2; // duplicated content

      const tween = gsap.to(track, {
        x: -trackWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      // Pause on hover
      const container = containerRef.current;
      container.addEventListener("mouseenter", () => tween.pause());
      container.addEventListener("mouseleave", () => tween.resume());

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [reduced, speed] }
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max">
        {/* Duplicate content for seamless loop */}
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

function cn(...args: (string | undefined | false)[]): string {
  return args.filter(Boolean).join(" ");
}
