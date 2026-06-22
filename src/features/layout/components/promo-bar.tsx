"use client";

import { useState, useEffect } from "react";
import { Truck, Tag, RefreshCw, Sparkles } from "lucide-react";

const PROMOS = [
  { icon: Truck, text: "Free shipping on orders over Rs 5,000" },
  { icon: Tag, text: "Use code WELCOME10 for 10% off your first order" },
  { icon: RefreshCw, text: "7-day easy returns — no questions asked" },
  { icon: Sparkles, text: "Cash on delivery available across Pakistan" },
];

export function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROMOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = PROMOS[index];

  return (
    <div className="bg-[#0E0E0E] text-cream border-b border-white/10">
      <div className="container-page">
        <div className="flex items-center justify-center gap-2 py-2.5 text-center">
          <current.icon className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" />
          <p className="text-caption tracking-wide text-cream/90 transition-opacity duration-300">
            {current.text}
          </p>
        </div>
      </div>
    </div>
  );
}
