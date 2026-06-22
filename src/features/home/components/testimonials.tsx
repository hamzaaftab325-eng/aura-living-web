import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "The brass lotus lamp arrived wrapped like a gift. The weight of it — you can tell it is real. It throws exactly the kind of light they described. My lounge finally feels finished.",
    name: "Ayesha K.",
    city: "Karachi",
    product: "Brass Lotus Table Lamp",
    rating: 5,
  },
  {
    quote:
      "I was nervous about ordering a plant online. The monstera arrived healthy, bigger than I expected, with a care card in Urdu. Three months on and it has grown two new leaves.",
    name: "Bilal M.",
    city: "Lahore",
    product: "Monstera Deliciosa",
    rating: 5,
  },
  {
    quote:
      "The saffron and oud candle smells like my grandmother's drawing room. I lit it for guests and they all asked. COD made it easy — I paid when I saw it was real.",
    name: "Nida R.",
    city: "Islamabad",
    product: "Saffron & Oud Pillar Candle",
    rating: 5,
  },
  {
    quote:
      "Ordered the cane floor lamp for my new apartment. Delivery was three days to Rawalpindi. The cane work is beautiful — you can see it is handwoven, not factory.",
    name: "Gohar A.",
    city: "Rawalpindi",
    product: "Cane Weave Floor Lamp",
    rating: 5,
  },
  {
    quote:
      "Bought the mogra candle for my mother for Eid. She cried. The smell is exactly mogra — not the chemical version, the real one. Will be ordering more.",
    name: "Fatima S.",
    city: "Multan",
    product: "Mogra Jasmine Candle",
    rating: 5,
  },
  {
    quote:
      "The snake plant has survived my neglect for six months. It is the first plant I have not killed. The terracotta pot is also genuinely nice — not the flimsy plastic kind.",
    name: "Zainab H.",
    city: "Faisalabad",
    product: "Snake Plant (Sansevieria)",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="surface-cream section-y border-t border-[#F0EBDC]" aria-label="Customer testimonials">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-overline text-gold mb-3">From Our Customers</p>
          <h2 className="text-h2 text-balance">
            Homes made warmer, one piece at a time.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
              ))}
            </div>
            <span className="text-body-sm text-[#5A5A5A]">
              4.8 average · 2,400+ reviews
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={idx}
              className="bg-white border border-[#F0EBDC] rounded-sm p-6 md:p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-[#C9A84C]/40 mb-4" />
              <blockquote className="text-body-sm text-[#2A2A2A] leading-relaxed flex-1 text-pretty">
                {t.quote}
              </blockquote>
              <div className="mt-6 pt-6 border-t border-[#F0EBDC]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0A0A0A]">{t.name}</p>
                    <p className="text-caption text-[#5A5A5A]">{t.city}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                </div>
                <p className="text-caption text-[#8A8275] mt-2">
                  Verified purchase · {t.product}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
