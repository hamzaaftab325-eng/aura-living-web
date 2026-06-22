"use client";

/* ============================================================================
   MagneticButton — subtle magnetic drift toward cursor on hover
   Source: Architecture Plan v1.1 §6.3
   - useMotionValue + useSpring for smooth, GPU-only transform
   - Primary CTAs only (Add to Cart, Checkout, Subscribe)
   - Reduced-motion: no effect
   ============================================================================ */

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number; // 0.2 = subtle, 0.5 = strong
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  as = "a",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as any}
      href={href as any}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={reduced ? undefined : { x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </MotionTag>
  );
}
