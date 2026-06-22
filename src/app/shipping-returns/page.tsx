import { ContentPage } from "@/features/layout/components/content-page";
import { Truck, RefreshCw, Shield, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Delivery across Pakistan in 3–5 days, free over Rs 5,000. 7-day easy returns. Same-day delivery in Karachi, Lahore, and Islamabad. COD available.",
  alternates: { canonical: "/shipping-returns" },
};

const CITIES = [
  { city: "Karachi", standard: "3–4 days", express: "1 day", sameDay: "Yes" },
  { city: "Lahore", standard: "3–5 days", express: "1–2 days", sameDay: "Yes" },
  { city: "Islamabad / Rawalpindi", standard: "4–5 days", express: "1–2 days", sameDay: "Yes" },
  { city: "Faisalabad", standard: "4–5 days", express: "2 days", sameDay: "No" },
  { city: "Multan", standard: "4–5 days", express: "2 days", sameDay: "No" },
  { city: "Peshawar", standard: "5 days", express: "2 days", sameDay: "No" },
  { city: "Quetta", standard: "5–6 days", express: "2–3 days", sameDay: "No" },
  { city: "Other cities", standard: "5–7 days", express: "2–3 days", sameDay: "No" },
];

export default function ShippingReturnsPage() {
  return (
    <ContentPage
      overline="Policies"
      title="Shipping & Returns"
      description="We deliver across Pakistan with care. Below is everything you need to know about how your order arrives, and what to do if it is not right."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shipping & Returns" }]}
    >
      <section className="container-narrow section-y">
        {/* Delivery methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-6">
            <Truck className="w-6 h-6 text-[#8A6B26] mb-3" />
            <h3 className="text-h4 mb-2">Standard</h3>
            <p className="text-body-sm text-[#5A5A5A] mb-2">3–5 business days</p>
            <p className="text-base font-semibold">Rs 200</p>
            <p className="text-caption text-[#2E7D5B] mt-1">Free over Rs 5,000</p>
          </div>
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-6">
            <Clock className="w-6 h-6 text-[#8A6B26] mb-3" />
            <h3 className="text-h4 mb-2">Express</h3>
            <p className="text-body-sm text-[#5A5A5A] mb-2">1–2 business days</p>
            <p className="text-base font-semibold">Rs 450</p>
          </div>
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-6">
            <Truck className="w-6 h-6 text-[#8A6B26] mb-3" />
            <h3 className="text-h4 mb-2">Same-Day</h3>
            <p className="text-body-sm text-[#5A5A5A] mb-2">Karachi, Lahore, Islamabad only</p>
            <p className="text-base font-semibold">Rs 700</p>
            <p className="text-caption text-[#8A8275] mt-1">Order before 12pm</p>
          </div>
        </div>

        {/* City table */}
        <h2 className="text-h2 mb-4">Delivery times by city</h2>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-body-sm">
            <thead>
              <tr className="border-b border-[#F0EBDC]">
                <th className="text-left py-3 pr-4 text-overline text-[#5A5A5A]">City</th>
                <th className="text-left py-3 px-4 text-overline text-[#5A5A5A]">Standard</th>
                <th className="text-left py-3 px-4 text-overline text-[#5A5A5A]">Express</th>
                <th className="text-left py-3 px-4 text-overline text-[#5A5A5A]">Same-Day</th>
              </tr>
            </thead>
            <tbody>
              {CITIES.map((row) => (
                <tr key={row.city} className="border-b border-[#F0EBDC]/50">
                  <td className="py-3 pr-4 font-medium">{row.city}</td>
                  <td className="py-3 px-4 text-[#5A5A5A]">{row.standard}</td>
                  <td className="py-3 px-4 text-[#5A5A5A]">{row.express}</td>
                  <td className="py-3 px-4">
                    {row.sameDay === "Yes" ? (
                      <span className="text-[#2E7D5B]">✓ Available</span>
                    ) : (
                      <span className="text-[#8A8275]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Returns */}
        <h2 className="text-h2 mb-4 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-[#8A6B26]" />
          7-Day Easy Returns
        </h2>
        <div className="space-y-4 text-body-sm text-[#2A2A2A] mb-12 text-pretty">
          <p>
            If a piece does not work in your home, send it back within 7 days of delivery. No questions asked. The item must be unused and in its original packaging. Plants are non-returnable for hygiene reasons, but if a plant arrives damaged or dies within 14 days of delivery, we replace it free.
          </p>
          <p>
            To start a return, message us on WhatsApp with your order number. We will arrange a courier pickup. Refunds process in 5–7 business days for card payments, instantly for store credit.
          </p>
        </div>

        {/* Process */}
        <h2 className="text-h2 mb-4">How returns work</h2>
        <ol className="space-y-4 mb-12">
          {[
            "Message us on WhatsApp with your order number and the item you want to return.",
            "We confirm eligibility and arrange a courier pickup within 1–2 business days.",
            "Pack the item in its original packaging. The courier brings a return label.",
            "We inspect the item on arrival (1–2 business days).",
            "Refund processed: 5–7 business days for card, instant for store credit.",
          ].map((step, idx) => (
            <li key={idx} className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#C9A84C] text-[#0E0E0E] text-sm font-bold flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>
              <p className="text-body-sm text-[#2A2A2A] pt-1">{step}</p>
            </li>
          ))}
        </ol>

        {/* Refund timelines */}
        <h2 className="text-h2 mb-4">Refund timelines</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-4">
            <p className="text-base font-semibold mb-1">Card payment</p>
            <p className="text-body-sm text-[#5A5A5A]">5–7 business days</p>
          </div>
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-4">
            <p className="text-base font-semibold mb-1">JazzCash / Easypaisa</p>
            <p className="text-body-sm text-[#5A5A5A]">3–5 business days</p>
          </div>
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-4">
            <p className="text-base font-semibold mb-1">Store credit</p>
            <p className="text-body-sm text-[#5A5A5A]">Instant</p>
          </div>
          <div className="bg-white border border-[#F0EBDC] rounded-sm p-4">
            <p className="text-base font-semibold mb-1">COD (cash not paid yet)</p>
            <p className="text-body-sm text-[#5A5A5A]">Store credit only</p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm">
          <Shield className="w-6 h-6 text-[#8A6B26] mb-3" />
          <p className="text-body-sm text-[#2A2A2A] text-pretty">
            <strong>Our promise:</strong> If a piece arrives damaged, wrong, or not as described, we replace it or refund you in full — including return shipping. No cost to you. This is on top of the 7-day return policy.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
