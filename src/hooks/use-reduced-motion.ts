"use client";

import { useEffect, useState } from "react";

/**
 * useReducedMotion — single source of truth for prefers-reduced-motion.
 * Source: Architecture Plan v1.1 §6.6
 *
 * Returns true when the user has requested reduced motion. All animations
 * must collapse to instant transitions when this is true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
