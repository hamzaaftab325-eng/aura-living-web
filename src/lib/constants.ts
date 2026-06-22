/* ============================================================================
   lib/constants.ts — Site-wide constants (nav, social, contact, trust)
   Source: Architecture Plan v1.1 §8.2, §12.5, §13
   ============================================================================ */

import { env } from "./env";

export const BRAND = {
  name: "Aura Living",
  tagline: "Light, life, and living beauty — for the home you are becoming.",
  shortTagline: "Light, life, and living beauty.",
  niche: "Premium Home Decor",
  market: "Pakistan",
  established: "2026",
  domain: "auraliving.pk",
} as const;

export const CATEGORIES = [
  {
    slug: "lamps",
    name: "Lamps",
    urduName: "چراغ",
    tagline: "Handcrafted brass, ceramic, and woven light",
    description:
      "Table lamps, floor lamps, and pendant lights crafted by Pakistani artisans in brass, ceramic, and handwoven cane. Warm 2700K bulbs that make a room feel like home.",
    image: "/editorial/lamps-tile-960.png",
  },
  {
    slug: "plants",
    name: "Plants",
    urduName: "پودے",
    tagline: "Living, breathing, air-purifying companions",
    description:
      "Indoor plants acclimatised for Pakistani homes and offices. Monstera, snake plants, pothos, and more — potted in terracotta and ceramic, delivered with care notes in Urdu and English.",
    image: "/editorial/plants-tile-960.png",
  },
  {
    slug: "candles",
    name: "Candles",
    urduName: "موم بتیاں",
    tagline: "Soy and beeswax, hand-poured in small batches",
    description:
      "Hand-poured soy and beeswax candles scented with oud, saffron, rose, and sandalwood. Long, clean burns that fill a room without overpowering it.",
    image: "/editorial/candles-tile-960.png",
  },
] as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/shop", submenu: CATEGORIES.map((c) => ({ label: c.name, href: `/shop/${c.slug}` })) },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Lamps", href: "/shop/lamps" },
      { label: "Plants", href: "/shop/plants" },
      { label: "Candles", href: "/shop/candles" },
      { label: "Collections", href: "/collections" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  help: {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Track Order", href: "/account/orders" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Accessibility Statement", href: "/accessibility-statement" },
    ],
  },
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/auraliving.pk", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/auraliving.pk", icon: "facebook" },
  { label: "WhatsApp", href: `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`, icon: "whatsapp" },
] as const;

export const TRUST_BADGES = [
  {
    title: "Cash on Delivery",
    description: "Pay when it arrives. Inspect before you pay.",
    icon: "wallet",
  },
  {
    title: "7-Day Easy Returns",
    description: "Changed your mind? Return within 7 days, no questions.",
    icon: "rotate-ccw",
  },
  {
    title: "Pakistani Owned",
    description: "Built in Karachi, sourcing from artisans across Pakistan.",
    icon: "map-pin",
  },
  {
    title: "Secure Checkout",
    description: "JazzCash, Easypaisa, card, or COD — your choice, protected.",
    icon: "shield-check",
  },
] as const;

export const PAKISTANI_PROVINCES = [
  "Sindh",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
] as const;

export const MAJOR_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Other",
] as const;

export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "3–5 business days",
    cost: 200,
    freeOverThreshold: 5000,
    cities: null,
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "1–2 business days",
    cost: 450,
    freeOverThreshold: null,
    cities: null,
  },
  {
    id: "same-day",
    name: "Same-Day Delivery",
    description: "Within Karachi, Lahore & Islamabad only",
    cost: 700,
    freeOverThreshold: null,
    cities: ["Karachi", "Lahore", "Islamabad"],
  },
] as const;

export const FREE_SHIPPING_THRESHOLD = 5000;

export const PAYMENT_METHODS: {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  default?: boolean;
}[] = [
  {
    id: "cod",
    name: "Cash on Delivery",
    shortName: "COD",
    description: "Pay with cash when your order arrives. Inspect before paying.",
    icon: "banknote",
    default: true,
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    shortName: "JazzCash",
    description: "Pay with your JazzCash mobile wallet.",
    icon: "smartphone",
  },
  {
    id: "easypaisa",
    name: "Easypaisa",
    shortName: "Easypaisa",
    description: "Pay with your Easypaisa account.",
    icon: "smartphone",
  },
  {
    id: "card",
    name: "Debit / Credit Card",
    shortName: "Card",
    description: "Visa, Mastercard, or UnionPay. Secure hosted checkout.",
    icon: "credit-card",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    shortName: "Bank",
    description: "Transfer to our HBL account. Order ships after confirmation.",
    icon: "building-2",
  },
];

export const WHATSAPP_CONFIG = {
  number: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  defaultMessage: "Hi Aura Living team, I have a question about your products.",
  businessHours: "Monday–Saturday, 10am–8pm PKT",
};
