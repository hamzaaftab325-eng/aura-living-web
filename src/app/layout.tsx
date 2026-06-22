import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   Fonts — Fraunces (display serif) + Inter (body sans)
   Architecture plan §5.3.2: next/font, display:swap, self-hosted, zero CLS
   -------------------------------------------------------------------------- */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

/* ----------------------------------------------------------------------------
   Metadata — Aura Living brand (ADR-0001 D1: brand name is final)
   -------------------------------------------------------------------------- */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aura Living — Light, Life, and Living Beauty",
    template: "%s — Aura Living",
  },
  description:
    "Premium home decor for the Pakistani home. Artisanal lamps, living plants, and hand-poured candles — curated with care, delivered with love. Cash on delivery available.",
  keywords: [
    "Aura Living",
    "premium home decor Pakistan",
    "lamps Pakistan",
    "indoor plants Pakistan",
    "scented candles Pakistan",
    "home decor Karachi",
    "home decor Lahore",
    "cash on delivery decor",
  ],
  authors: [{ name: "Aura Living" }],
  creator: "Aura Living",
  publisher: "Aura Living",
  applicationName: "Aura Living",
  category: "Home & Garden",
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "ur": "/ur",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    alternateLocale: ["ur_PK"],
    url: siteUrl,
    siteName: "Aura Living",
    title: "Aura Living — Light, Life, and Living Beauty",
    description:
      "Premium home decor for the Pakistani home. Artisanal lamps, living plants, and hand-poured candles.",
    images: [
      {
        url: "/og/og-default-1200.png",
        width: 1200,
        height: 630,
        alt: "Aura Living — Light, Life, and Living Beauty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura Living — Light, Life, and Living Beauty",
    description:
      "Premium home decor for the Pakistani home. Lamps, plants, and candles.",
    images: ["/og/og-default-1200.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0E" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ----------------------------------------------------------------------------
   JSON-LD — Organization structured data (§9.3)
   -------------------------------------------------------------------------- */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aura Living",
  alternateName: "Aura Living Pakistan",
  url: siteUrl,
  logo: `${siteUrl}/icons/icon-512.png`,
  description:
    "Premium home decor for the Pakistani home. Artisanal lamps, living plants, and hand-poured candles.",
  slogan: "Light, life, and living beauty — for the home you are becoming.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
    addressRegion: "Sindh",
    addressLocality: "Karachi",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Urdu"],
    contactOption: "TollFree",
  },
  sameAs: [
    "https://instagram.com/auraliving.pk",
    "https://facebook.com/auraliving.pk",
    "https://wa.me/923000000000",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aura Living",
  url: siteUrl,
  description:
    "Premium home decor for the Pakistani home. Lamps, plants, and candles.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/* ----------------------------------------------------------------------------
   Root Layout
   -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={cn(
          fraunces.variable,
          inter.variable,
          "antialiased bg-background text-foreground min-h-screen flex flex-col"
        )}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
