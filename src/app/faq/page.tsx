"use client";

import { useState } from "react";
import { ContentPage } from "@/features/layout/components/content-page";
import { ChevronDown, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about orders, shipping, returns, payments, and products at Aura Living. COD, JazzCash, Easypaisa, and card payments accepted across Pakistan.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    category: "Orders",
    questions: [
      {
        q: "How do I track my order?",
        a: "Once your order ships, you will receive a WhatsApp message with a tracking link. You can also track your order anytime at /account/orders using your order number and phone number.",
      },
      {
        q: "Can I modify or cancel my order after placing it?",
        a: "You can modify or cancel within 2 hours of placing the order. Message us on WhatsApp with your order number and we will handle it. After 2 hours, the order enters packing and cannot be changed.",
      },
      {
        q: "Do you take custom or bulk orders?",
        a: "Yes. For weddings, corporate gifts, or custom pieces, write to us at hello@auraliving.pk or WhatsApp. Bulk orders of 10+ pieces get a 15% discount. Custom brass work takes 4–6 weeks.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery is 3–5 business days across Pakistan. Express is 1–2 days. Same-day delivery is available within Karachi, Lahore, and Islamabad for orders placed before 12pm.",
      },
      {
        q: "How much does shipping cost?",
        a: "Standard shipping is Rs 200, free on orders over Rs 5,000. Express is Rs 450. Same-day is Rs 700. Shipping is calculated at checkout based on your location and chosen method.",
      },
      {
        q: "Do you ship outside Pakistan?",
        a: "Not yet. We are focused on serving Pakistan well first. If you are abroad and want to send a gift to someone in Pakistan, we can help — just message us.",
      },
      {
        q: "Will my plant survive shipping?",
        a: "Yes. We have spent a year perfecting our plant packaging. Each plant is secured in a custom box that holds the pot in place and protects the leaves. We acclimatise plants for a week before shipping so they are strong enough for the journey. If a plant arrives damaged, we replace it free.",
      },
    ],
  },
  {
    category: "Returns",
    questions: [
      {
        q: "What is your return policy?",
        a: "7 days, no questions asked. If you do not love it, send it back. The piece must be unused and in its original packaging. Initiate a return through WhatsApp or /account/orders.",
      },
      {
        q: "Who pays for return shipping?",
        a: "If the return is because of a defect or our error, we pay. If you changed your mind, you pay the return shipping (Rs 200–400 depending on size).",
      },
      {
        q: "How long do refunds take?",
        a: "5–7 business days for card refunds. Instant for store credit. COD orders get store credit (we cannot refund cash you have not paid yet).",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        q: "Is cash on delivery really available?",
        a: "Yes, across all of Pakistan. Pay with cash when your order arrives. Inspect before you pay. For COD orders above Rs 15,000, we may call to confirm — this is to prevent fraudulent orders, not because we do not trust you.",
      },
      {
        q: "Which payment methods do you accept?",
        a: "Cash on Delivery (default), JazzCash, Easypaisa, debit/credit cards (Visa, Mastercard, UnionPay), and bank transfer. All payment information is processed through secure, PCI-compliant gateways — we never see or store your card details.",
      },
      {
        q: "Is it safe to pay with my card on your site?",
        a: "Yes. We use a hosted checkout — you are redirected to a PCI-compliant payment gateway, enter your card there, and come back. We never see, touch, or store your card number.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        q: "Are your products really made in Pakistan?",
        a: "Yes, every piece. Brass from Peshawar, terracotta from Hala, onyx from Balochistan, candles poured in Karachi, plants grown outside Karachi. The country of origin is on each product page.",
      },
      {
        q: "Why are your lamps more expensive than Daraz?",
        a: "Because they are real. Real brass, hand-hammered, made by an artisan paid fairly. A Rs 8,499 brass lamp from us is the same lamp that would cost Rs 3,000 imported and machine-stamped — but ours will last decades and theirs will dent in a year. The math is not in their favour.",
      },
      {
        q: "Do your candles contain paraffin?",
        a: "No. All our candles are 100% soy wax, or a soy and beeswax blend. We never use paraffin (a petroleum byproduct that releases toxins when burned). Our wicks are cotton or wood, never lead-cored.",
      },
      {
        q: "How do I care for my brass lamp?",
        a: "Wipe with a soft dry cloth. For shine, use a brass polish (we sell one) or a paste of lemon and baking soda. Brass develops a natural patina over years — many customers consider this a feature. To prevent patina, keep the lamp dry and away from humidity.",
      },
    ],
  },
  {
    category: "Account",
    questions: [
      {
        q: "Do I need an account to order?",
        a: "No. You can checkout as a guest. An account makes future orders faster and lets you track orders, save addresses, and build a wishlist — but it is not required.",
      },
      {
        q: "I forgot my password. How do I reset it?",
        a: "Click 'Forgot password' on the login page. You will get a reset link by email or WhatsApp. If you do not receive it within 5 minutes, message us.",
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>("0-0");

  const filtered = FAQS.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <ContentPage
      overline="Help Centre"
      title="Frequently asked questions."
      description="Quick answers to the questions we hear most. Cannot find what you are looking for? Message us on WhatsApp — we love a good question."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
    >
      <section className="container-narrow section-y">
        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-[#F0EBDC] rounded-sm px-4 py-3 mb-10">
          <Search className="w-5 h-5 text-[#5A5A5A]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="flex-1 bg-transparent outline-none text-[#0A0A0A]"
            aria-label="Search FAQs"
          />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.flatMap((cat) =>
                cat.questions.map((q) => ({
                  "@type": "Question",
                  name: q.q,
                  acceptedAnswer: { "@type": "Answer", text: q.a },
                }))
              ),
            }),
          }}
        />

        <div className="space-y-12">
          {filtered.map((cat, catIdx) => (
            <div key={cat.category}>
              <h2 className="text-h3 mb-4 pb-2 border-b border-[#F0EBDC]">{cat.category}</h2>
              <div className="space-y-2">
                {cat.questions.map((item, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = open === id;
                  return (
                    <div key={id} className="border-b border-[#F0EBDC]">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="w-full flex items-center justify-between py-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base font-medium text-[#0A0A0A] pr-4">{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#5A5A5A] flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="pb-4 text-body-sm text-[#2A2A2A] leading-relaxed text-pretty">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-h4 mb-2">No questions match your search.</p>
            <p className="text-body-sm text-[#5A5A5A]">Try a different word, or message us on WhatsApp.</p>
          </div>
        )}
      </section>
    </ContentPage>
  );
}
