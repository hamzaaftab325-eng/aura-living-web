"use client";

import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import Link from "next/link";
import { RefreshCw, MessageCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-[70vh] flex items-center justify-center pt-24 md:pt-28">
        <div className="container-narrow text-center">
          <p className="text-overline text-gold mb-3">Something went wrong</p>
          <h1 className="text-h1 mb-4 text-balance">A flicker in the light.</h1>
          <p className="text-body-lg text-[#5A5A5A] mb-8 max-w-md mx-auto text-pretty">
            An unexpected error occurred. We have been notified. Please try again — or message us on WhatsApp if it persists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" onClick={reset} className="btn-gold">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <a
              href="https://wa.me/923000000000"
              className="btn-outline-gold"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </a>
          </div>
          {error.digest && (
            <p className="text-caption text-[#8A8275] mt-8">
              Error reference: {error.digest}
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
