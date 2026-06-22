import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function NewsletterCTA() {
  return (
    <section className="surface-cream section-y border-t border-[#F0EBDC]" aria-label="Newsletter signup">
      <div className="container-narrow text-center">
        <Reveal>
          <p className="text-overline text-gold mb-4">Stay in touch</p>
          <h2 className="text-h1 text-balance mb-6">
            Letters from the studio.
          </h2>
          <p className="text-body-lg text-[#5A5A5A] mb-8 text-pretty max-w-xl mx-auto">
            Care tips for your plants and lamps. New candle scents before anyone else. The occasional thought on what makes a house a home. One letter a fortnight — no more.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="post">
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-white border border-[#F0EBDC] rounded-sm px-4 py-3 text-[#0A0A0A] placeholder:text-[#8A8275] outline-none focus:border-[#8A6B26] transition-colors text-sm"
              aria-label="Email address"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-caption text-[#8A8275] mt-4">
            We never share your email. Unsubscribe with one click.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 pt-12 border-t border-[#F0EBDC] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "48", label: "Curated pieces" },
            { num: "2,400+", label: "Happy customers" },
            { num: "4.8★", label: "Average rating" },
            { num: "7-day", label: "Easy returns" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-h3 text-[#8A6B26] font-display">{stat.num}</p>
              <p className="text-caption text-[#5A5A5A]">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
