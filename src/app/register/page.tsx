import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an Aura Living account for faster checkout and order tracking.",
  alternates: { canonical: "/register" },
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <ContentPage
      overline="Account"
      title="Join Aura Living."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Register" }]}
    >
      <section className="container-narrow section-y">
        <div className="max-w-md mx-auto bg-white border border-[#F0EBDC] rounded-sm p-8">
          <form className="space-y-4" action="/api/auth/register" method="post">
            <div>
              <label className="block text-body-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                placeholder="e.g. Ayesha Khan"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                className="w-full bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                placeholder="0300 1234567"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                placeholder="At least 8 characters"
              />
              <p className="text-caption text-[#8A8275] mt-1">Use 8+ characters with a mix of letters, numbers, and symbols.</p>
            </div>
            <label className="flex items-start gap-2 text-body-sm">
              <input type="checkbox" required className="accent-[#8A6B26] mt-1" />
              <span>I agree to the <a href="/terms" className="text-[#8A6B26] underline">Terms of Service</a> and <a href="/privacy" className="text-[#8A6B26] underline">Privacy Policy</a>.</span>
            </label>
            <button type="submit" className="btn-gold w-full">Create Account</button>
          </form>
          <p className="text-center text-body-sm text-[#5A5A5A] mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#8A6B26] hover:underline font-medium">Sign in</a>
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
