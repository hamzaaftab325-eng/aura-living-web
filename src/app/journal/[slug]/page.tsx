import { ContentPage } from "@/features/layout/components/content-page";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${title} — Aura Living Journal`,
    description: `${title} — a story from the Aura Living journal.`,
    alternates: { canonical: `/journal/${slug}` },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <ContentPage
      overline="The Journal"
      title={title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Journal", href: "/journal" },
        { label: title },
      ]}
    >
      <article className="container-narrow section-y">
        <div className="mb-8">
          <p className="text-caption text-[#8A8275]">June 2026 · 6 min read · Plant Care</p>
        </div>

        <div className="aspect-[3/2] bg-[#F0EBDC] rounded-sm mb-8 relative">
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: `radial-gradient(ellipse at center, #C9A84C22 0%, #F0EBDC 70%)`,
            }}
          />
        </div>

        <div className="space-y-6 text-body-lg text-[#2A2A2A] leading-relaxed text-pretty">
          <p className="text-h4 font-display italic text-[#5A5A5A] border-l-2 border-[#C9A84C] pl-4">
            The full article is being written. Below is a preview — the kind of piece we publish in the journal, honest and specific to the homes we serve.
          </p>

          <p>
            Karachi is not the climate a monstera evolved for. The plant came from the cloud forests of Central America, where the air is cool and the light is dappled through a canopy. Our city is hot, salty, and bright. But monsteras are adaptable — give them the right conditions and they will not just survive, they will thrive.
          </p>

          <p>
            The biggest mistake we see is light. People hear "indoor plant" and put it in the darkest corner of the house. A monstera will live there, but it will not grow. It needs bright indirect light — a south- or east-facing window with a sheer curtain is ideal. If the leaves are not developing the iconic splits (fenestrations), it is not getting enough light.
          </p>

          <p>
            Watering is the second mistake. The instinct is to water on a schedule. Do not. Water when the top two centimetres of soil are dry — in Karachi's summer that might be every five days, in winter every ten. Stick your finger in. If it comes out clean, water. If soil clings to it, wait.
          </p>

          <p>
            Humidity is the third. Karachi is humid, but air-conditioning strips it out. If your monstera is in an AC room, mist it twice a week, or put it on a pebble tray with water. The leaves will tell you — brown, crispy edges mean too dry.
          </p>

          <p>
            Finally: load-shedding. Temperature swings stress tropical plants. If your monstera is near a window that gets direct sun during a power cut, move it back during the day. A single afternoon of direct Karachi sun through glass will scorch the leaves.
          </p>

          <p>
            Do these things and your monstera will reward you with a new leaf every few weeks through the growing season. We have a four-year-old monstera in the studio that has produced eleven leaves this year. It is not magic. It is attention.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F0EBDC]">
          <p className="text-overline text-[#5A5A5A] mb-3">Written by</p>
          <p className="text-base font-semibold">Aura Living Studio</p>
          <p className="text-body-sm text-[#5A5A5A]">Karachi, Pakistan</p>
        </div>

        <div className="mt-12 p-8 bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm text-center">
          <h2 className="text-h3 mb-3">Ready to bring a monstera home?</h2>
          <p className="text-body-sm text-[#5A5A5A] mb-6">Acclimatised for Pakistani homes, delivered with a care card in Urdu and English.</p>
          <Link href="/product/monstera-deliciosa-medium" className="btn-gold inline-flex">
            Shop Monstera Deliciosa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </ContentPage>
  );
}
