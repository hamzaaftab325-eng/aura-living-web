import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Mail, MapPin } from "lucide-react";
import { FOOTER_LINKS, SOCIAL_LINKS, BRAND, WHATSAPP_CONFIG } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="surface-dark grain mt-auto">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-overline text-[#C9A84C] mb-3">The Aura Living Letter</p>
              <h2 className="text-h2 text-white text-balance">
                Letters from the studio — care tips, new arrivals, and the occasional thought.
              </h2>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3" action="/api/newsletter" method="post">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-[#C9A84C] transition-colors"
                  aria-label="Email address"
                />
                <button type="submit" className="btn-gold whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-caption text-cream/50 mt-3">
                One letter a fortnight. Unsubscribe anytime. We never share your email.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-semibold text-white">Aura</span>
              <span className="font-display text-2xl font-light italic text-[#C9A84C]">Living</span>
            </Link>
            <p className="text-body-sm text-cream/60 max-w-xs mb-6">
              {BRAND.tagline}
            </p>
            <div className="space-y-2 text-body-sm text-cream/70">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}`}
                className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: +92 300 0000000
              </a>
              <a
                href="mailto:hello@auraliving.pk"
                className="flex items-center gap-2 hover:text-[#C9A84C] transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@auraliving.pk
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Karachi, Pakistan
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(FOOTER_LINKS).map((col) => (
            <div key={col.title}>
              <h3 className="text-overline text-[#C9A84C] mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-cream/70 hover:text-[#C9A84C] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Cash on Delivery", sub: "Pay at your door" },
            { title: "7-Day Returns", sub: "No questions asked" },
            { title: "Pakistani Owned", sub: "Made in Karachi" },
            { title: "Secure Checkout", sub: "JazzCash · Easypaisa · Card" },
          ].map((b) => (
            <div key={b.title} className="text-center md:text-left">
              <p className="text-sm font-semibold text-cream">{b.title}</p>
              <p className="text-caption text-cream/50">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-cream/50 text-center sm:text-left">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Made with care in Karachi.
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-[#C9A84C] transition-colors"
                aria-label={social.label}
              >
                {social.icon === "instagram" && <Instagram className="w-4 h-4" />}
                {social.icon === "facebook" && <Facebook className="w-4 h-4" />}
                {social.icon === "whatsapp" && <MessageCircle className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
