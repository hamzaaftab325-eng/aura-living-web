import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms under which you use the Aura Living website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <ContentPage
      overline="Legal"
      title="Terms of Service"
      description="Last updated: June 2026. These are the terms under which you use our website and buy from us. Please read them."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
    >
      <section className="container-narrow section-y">
        <div className="space-y-8 text-body-sm text-[#2A2A2A] leading-relaxed">
          <div>
            <h2 className="text-h2 mb-3">1. Acceptance of terms</h2>
            <p>By using auraliving.pk or placing an order with Aura Living, you agree to these terms. If you do not agree, please do not use the site. We may update these terms from time to time; continued use after changes means you accept the new terms.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">2. Your account</h2>
            <p className="mb-3">You may browse and order as a guest, but creating an account gives you faster checkout, order tracking, and a wishlist. If you create an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate, current information.</li>
              <li>Keep your password confidential.</li>
              <li>Be responsible for all activity under your account.</li>
              <li>Notify us immediately of any unauthorised use.</li>
            </ul>
            <p className="mt-3">You must be at least 16 years old to create an account. Orders can be placed by anyone, but a parent or guardian must approve orders placed by minors.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">3. Ordering and pricing</h2>
            <p className="mb-3">All prices are in Pakistani Rupees (PKR) and include applicable taxes. Prices are displayed on each product page and are confirmed at checkout. We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Refuse or cancel an order (e.g. suspected fraud, pricing error, out of stock).</li>
              <li>Limit quantities per customer.</li>
              <li>Change prices without notice (but once you place an order, the price is locked).</li>
            </ul>
            <p className="mt-3">If we cancel an order, we refund you in full. If you have already paid by card or wallet, the refund processes in 5–7 business days.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">4. Payment</h2>
            <p className="mb-3">We accept the following payment methods:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Cash on Delivery (COD) — pay with cash when your order arrives.</li>
              <li>JazzCash — mobile wallet transfer.</li>
              <li>Easypaisa — mobile wallet transfer.</li>
              <li>Debit/Credit Card — Visa, Mastercard, UnionPay.</li>
              <li>Bank Transfer — order ships after payment is confirmed.</li>
            </ul>
            <p className="mt-3">For COD orders above Rs 15,000, we may call to confirm before shipping. This is to prevent fraudulent orders, not because we doubt you.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">5. Shipping and delivery</h2>
            <p className="mb-3">We deliver across Pakistan. Delivery times are estimates, not guarantees. We are not liable for delays caused by couriers, weather, or events beyond our control. If a delivery is significantly delayed, contact us and we will chase it.</p>
            <p>Risk of loss passes to you when the courier hands over the package. For COD orders, you inspect before paying — once you accept the package, the sale is complete.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">6. Returns and refunds</h2>
            <p>Our return policy is detailed on the <a href="/shipping-returns" className="text-[#8A6B26] underline">Shipping & Returns</a> page. In short: 7 days, no questions asked, unused items in original packaging. Plants are non-returnable but covered by a 14-day replacement guarantee.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">7. Product information</h2>
            <p>We do our best to display products accurately — colours, dimensions, materials. But screens vary, brass develops patina, terracotta breathes, and every handmade piece is slightly different. The product you receive may not match the photograph exactly, and that is often the point. If a product is materially different from what we described, we accept it as a return.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">8. Intellectual property</h2>
            <p>All content on this site — text, photographs, graphics, logos, the Aura Living name — is our property or the property of our makers, and is protected by Pakistani and international copyright law. You may not reproduce, copy, or distribute our content without written permission. Sharing product links on social media is fine and encouraged.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">9. Prohibited uses</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the site for any unlawful purpose.</li>
              <li>Place fraudulent orders, particularly COD orders you do not intend to pay for.</li>
              <li>Attempt to access our systems, database, or admin areas.</li>
              <li>Scrape, copy, or resell our product images or descriptions.</li>
              <li>Use bots or scripts to place bulk orders.</li>
            </ul>
            <p className="mt-3">Violations may result in order cancellation, account termination, and legal action.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">10. Limitation of liability</h2>
            <p>Aura Living is not liable for indirect, incidental, or consequential damages arising from the use of our products or site. Our maximum liability for any claim is the amount you paid for the product in question. This does not affect your statutory rights under Pakistani consumer protection law.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">11. Governing law</h2>
            <p>These terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes will be resolved in the courts of Karachi, Sindh.</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">12. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:hello@auraliving.pk" className="text-[#8A6B26] underline">hello@auraliving.pk</a> or WhatsApp us.</p>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
