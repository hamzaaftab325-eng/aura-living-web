import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EditorialBanner() {
  return (
    <section className="surface-dark grain section-y" aria-label="The Monsoon Edit collection">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-0 rounded-sm overflow-hidden">
          {/* Image side */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[500px] bg-[#2A2A2A]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, #C9A84C22 0%, #0E0E0E 70%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-display text-7xl md:text-9xl text-[#C9A84C]/20 italic">
                Monsoon
              </p>
            </div>
          </div>

          {/* Text side */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <p className="text-overline text-[#C9A84C] mb-4">Seasonal Collection · June–September</p>
            <h2 className="text-h1 text-white text-balance mb-6">
              The Monsoon Edit
            </h2>
            <p className="text-body-lg text-cream/80 mb-4 text-pretty">
              When the rains come to Karachi, the air softens and the light goes grey-gold. This collection is built for that mood — warm candlelight against the cool air, green plants that drink the humidity, and brass that catches the low clouds.
            </p>
            <p className="text-body-sm text-cream/60 mb-8">
              Twelve pieces, curated for the season. Available through September.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/collections/monsoon-edit" className="btn-gold">
                Explore the Edit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lookbook" className="btn-outline-gold">
                View Lookbook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
