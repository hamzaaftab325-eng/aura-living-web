import { MessageCircle, Mail, RefreshCw } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance",
  description: "Aura Living is temporarily unavailable.",
  robots: { index: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen surface-dark grain flex items-center justify-center p-6">
      <div className="max-w-md text-center text-cream">
        <p className="text-overline text-[#C9A84C] mb-4">We will be back shortly</p>
        <h1 className="text-h1 text-white mb-4 text-balance">A moment of stillness.</h1>
        <p className="text-body-lg text-cream/80 mb-8 text-pretty">
          We are making a few things better. The shop will be back soon — usually within an hour. Your cart is saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a
            href="https://wa.me/923000000000"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-sm text-sm font-medium hover:bg-[#1faa50] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp us
          </a>
          <a
            href="mailto:hello@auraliving.pk"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-cream/20 text-cream rounded-sm text-sm font-medium hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
        <p className="text-caption text-cream/40 flex items-center justify-center gap-2">
          <RefreshCw className="w-3 h-3 animate-spin" />
          This page refreshes automatically every 5 minutes.
        </p>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(() => window.location.reload(), 300000);`,
        }}
      />
    </main>
  );
}
