"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_CONFIG } from "@/lib/constants";

export function WhatsAppFAB() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Hidden on /checkout and /account/checkout (per §12.4)
  const hidden = pathname.startsWith("/checkout");

  if (!mounted || hidden) return null;

  const message = encodeURIComponent(WHATSAPP_CONFIG.defaultMessage);
  const href = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-[var(--z-fab)] group flex items-center gap-3"
    >
      <span className="hidden md:block bg-[#0E0E0E] text-cream text-sm px-4 py-2 rounded-full shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Questions? Chat with us
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_20px_-2px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform">
        <MessageCircle className="w-7 h-7 text-white" fill="white" stroke="#25D366" strokeWidth={1.5} />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </span>
    </a>
  );
}
