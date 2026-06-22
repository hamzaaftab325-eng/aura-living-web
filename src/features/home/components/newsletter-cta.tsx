import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="surface-dark grain section-y" aria-label="Newsletter signup">
      <div className="container-narrow text-center">
        <p className="text-overline text-[#C9A84C] mb-4">Stay in touch</p>
        <h2 className="text-h1 text-white text-balance mb-6">
          Letters from the studio.
        </h2>
        <p className="text-body-lg text-cream/80 mb-8 text-pretty">
          Care tips for your plants and lamps. New candle scents before anyone else. The occasional thought on what makes a house feel like home. One letter a fortnight — no more.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="post">
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="flex-1 bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-cream placeholder:text-cream/40 outline-none focus:border-[#C9A84C] transition-colors text-sm"
            aria-label="Email address"
          />
          <button type="submit" className="btn-gold whitespace-nowrap">
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-caption text-cream/40 mt-4">
          We never share your email. Unsubscribe with one click.
        </p>

        <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {[
            { num: "48", label: "Curated pieces" },
            { num: "2,400+", label: "Happy customers" },
            { num: "4.8★", label: "Average rating" },
            { num: "7-day", label: "Easy returns" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-h3 text-[#C9A84C] font-display">{stat.num}</p>
              <p className="text-caption text-cream/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
