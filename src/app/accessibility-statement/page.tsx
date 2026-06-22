import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Aura Living is committed to WCAG 2.2 AA accessibility. This statement explains our conformance target, audit methodology, and how to report issues.",
  alternates: { canonical: "/accessibility-statement" },
};

export default function AccessibilityPage() {
  return (
    <ContentPage
      overline="Commitment"
      title="Accessibility Statement"
      description="Aura Living is built to be usable by everyone, including people with disabilities. This page explains how we do that and how to tell us if we have fallen short."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
    >
      <section className="container-narrow section-y">
        <div className="space-y-8 text-body-sm text-[#2A2A2A] leading-relaxed">
          <div>
            <h2 className="text-h2 mb-3">Our commitment</h2>
            <p>
              Aura Living targets <strong>WCAG 2.2 Level AA</strong> conformance. This means we follow the Web Content Accessibility Guidelines version 2.2, at the AA level, including the nine new criteria introduced in 2.2 (focus appearance, target size minimum, accessible authentication, and others). Accessibility is not a final-pass checklist for us — it is a property of the system, built in from the design tokens up.
            </p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">How we test</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Automated:</strong> Every page is scanned with axe-core on every code change. Zero violations is a blocking CI check — we cannot deploy if there is a violation.</li>
              <li><strong>Keyboard-only:</strong> Every page is navigable by keyboard alone. Tab order follows visual order. Focus is always visible (2px gold outline, 2px offset). No keyboard traps.</li>
              <li><strong>Screen reader:</strong> Major pages (home, product, cart, checkout) are tested with NVDA on Windows and VoiceOver on macOS and iOS before each release.</li>
              <li><strong>Lighthouse:</strong> Accessibility audit score of 95+ is required for deployment.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">What we do well</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Semantic HTML — headings, lists, landmarks, labels — as the primary accessibility strategy.</li>
              <li>Color contrast that meets AA at every text size. Gold-on-light always uses #8A6B26 (4.9:1 on cream), never #C9A84C (which fails at 2.1:1).</li>
              <li>Touch targets at least 44×44px on mobile.</li>
              <li>Every image has descriptive alt text, or is marked decorative with an empty alt.</li>
              <li>Forms have proper labels, error messages are announced to screen readers, and errors are associated with their fields.</li>
              <li>Skip-to-content link at the top of every page.</li>
              <li>All animations respect <code>prefers-reduced-motion</code> — they collapse to instant transitions for users who prefer less motion.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">Known issues</h2>
            <p className="mb-3">We are not perfect. As of June 2026:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product image gallery on mobile does not yet announce the current image position to screen readers. Fix planned: July 2026.</li>
              <li>The cart drawer focus trap occasionally skips the close button on first open. Fix planned: June 2026.</li>
              <li>Some decorative SVGs in the footer are not marked <code>aria-hidden</code>. Fix planned: June 2026.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">How to report an issue</h2>
            <p className="mb-3">If you find an accessibility problem, please tell us. We take it seriously and will fix it. Reach us at:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>WhatsApp:</strong> +92 300 0000000 (fastest)</li>
              <li><strong>Email:</strong> accessibility@auraliving.pk</li>
              <li><strong>Contact form:</strong> <a href="/contact" className="text-[#8A6B26] underline">/contact</a></li>
            </ul>
            <p className="mt-3">Please include the page URL and a description of the issue. If you use a screen reader, tell us which one — it helps us reproduce.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">Last reviewed</h2>
            <p>June 2026. This statement is reviewed quarterly.</p>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
