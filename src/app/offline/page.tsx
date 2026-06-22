import { RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description: "You appear to be offline.",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen surface-cream flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F0EBDC] flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-[#8A6B26]" />
        </div>
        <p className="text-overline text-gold mb-3">No connection</p>
        <h1 className="text-h1 mb-4 text-balance">You appear to be offline.</h1>
        <p className="text-body-lg text-[#5A5A5A] mb-8 text-pretty">
          Your internet connection seems to be down. Your cart is saved — you will not lose anything. Once you are back online, the shop will reload.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-gold"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <p className="text-body-sm text-[#8A8275] mt-6">
          Need to reach us? WhatsApp: +92 300 0000000
        </p>
      </div>
    </main>
  );
}
