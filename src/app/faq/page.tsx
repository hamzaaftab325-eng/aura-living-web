import { FAQContent } from "./faq-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about orders, shipping, returns, payments, and products at Aura Living. COD, JazzCash, Easypaisa, and card payments accepted across Pakistan.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return <FAQContent />;
}
