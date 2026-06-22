import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aura Living collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ContentPage
      overline="Legal"
      title="Privacy Policy"
      description="Last updated: June 2026. This policy explains what information we collect, why we collect it, and what we do with it."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
    >
      <section className="container-narrow section-y">
        <div className="space-y-8 text-body-sm text-[#2A2A2A] leading-relaxed">
          <div>
            <h2 className="text-h2 mb-3">1. Information we collect</h2>
            <p className="mb-3">We collect information you give us directly:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contact information</strong> — name, phone number, email address (when you place an order, create an account, or contact us).</li>
              <li><strong>Shipping address</strong> — where you want your order delivered.</li>
              <li><strong>Payment information</strong> — we do <strong>not</strong> store your card number. Payments are processed by PCI-compliant gateways (JazzCash, Easypaisa, your bank). We only see whether the payment succeeded.</li>
              <li><strong>Order history</strong> — what you bought, so you can track orders and we can provide support.</li>
              <li><strong>Communications</strong> — messages you send us on WhatsApp or email.</li>
            </ul>
            <p className="mt-3">We also collect some information automatically:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Device and browser information (to optimise the site).</li>
              <li>Pages you visit and links you click (to understand what works).</li>
              <li>IP address (for security and fraud prevention).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">2. How we use your information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process and deliver your orders.</li>
              <li>To communicate with you about your orders (WhatsApp, SMS, email).</li>
              <li>To provide customer support.</li>
              <li>To prevent fraud and abuse (particularly for COD orders).</li>
              <li>To improve our products, website, and services.</li>
              <li>To send you our newsletter — <strong>only if you subscribe</strong>, and you can unsubscribe anytime.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">3. How we share your information</h2>
            <p className="mb-3">We do not sell your information. Ever. We share it only with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Couriers</strong> (TCS, Leopards, Bykea) — name, phone, address, and order contents for delivery.</li>
              <li><strong>Payment processors</strong> (JazzCash, Easypaisa, your bank) — only what they need to process your payment.</li>
              <li><strong>WhatsApp</strong> — if you message us on WhatsApp, Meta processes that message. We cannot control Meta's data practices.</li>
              <li><strong>Analytics providers</strong> (Plausible, cookieless) — aggregated, anonymised data only.</li>
              <li><strong>Law enforcement</strong> — only if legally required, or to prevent fraud.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">4. Cookies</h2>
            <p className="mb-3">We use three categories of cookies:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Essential</strong> — always on. Needed for the cart, checkout, and security. Without these the site does not work.</li>
              <li><strong>Analytics</strong> — opt-in. Helps us understand which pages are useful. We use Plausible, which is cookieless and does not track you across other sites.</li>
              <li><strong>Marketing</strong> — off by default. We may add this in the future for retargeting. You will be asked before it is turned on.</li>
            </ul>
            <p className="mt-3">You can manage your cookie preferences anytime in the cookie banner at the bottom of the screen.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">5. Data storage and security</h2>
            <p className="mb-3">
              Your data is stored on secured servers (Vercel for the website, Supabase for the database in the full-stack phase). We encrypt data in transit (HTTPS) and at rest. Access is restricted to authorised team members who need it to run the business.
            </p>
            <p>
              We retain your order history for as long as you have an account, plus 7 years for tax and accounting compliance. If you delete your account, we erase your personal data within 30 days (except where we are legally required to keep it).
            </p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">6. Your rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Opt out of marketing communications anytime.</li>
              <li>Export your data in a portable format.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email <a href="mailto:privacy@auraliving.pk" className="text-[#8A6B26] underline">privacy@auraliving.pk</a> or message us on WhatsApp.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">7. Children's privacy</h2>
            <p>Aura Living is not intended for children under 16. We do not knowingly collect data from children. If you believe we have, please contact us and we will erase it.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">8. Changes to this policy</h2>
            <p>We may update this policy as our practices evolve. We will notify you of material changes by email or a notice on the site. The "last updated" date at the top reflects the most recent version.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">9. Contact</h2>
            <p>Questions about privacy? Email <a href="mailto:privacy@auraliving.pk" className="text-[#8A6B26] underline">privacy@auraliving.pk</a> or WhatsApp us. We take privacy seriously and will respond within 5 business days.</p>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
