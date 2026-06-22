import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Aura Living account.",
  alternates: { canonical: "/login" },
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <ContentPage
      overline="Account"
      title="Welcome back."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Login" }]}
    >
      <section className="container-narrow section-y">
        <div className="max-w-md mx-auto bg-white border border-[#F0EBDC] rounded-sm p-8">
          <form className="space-y-4" action="/api/auth/login" method="post">
            <div>
              <label className="block text-body-sm font-medium mb-1">Email or Phone</label>
              <input
                type="text"
                required
                className="w-full bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                placeholder="your@email.com or 0300 1234567"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full bg-[#FAF8F2] border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-body-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#8A6B26]" />
                <span>Remember me</span>
              </label>
              <a href="/login" className="text-[#8A6B26] hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="btn-gold w-full">Sign In</button>
          </form>
          <p className="text-center text-body-sm text-[#5A5A5A] mt-6">
            New to Aura Living?{" "}
            <a href="/register" className="text-[#8A6B26] hover:underline font-medium">Create an account</a>
          </p>
        </div>
      </section>
    </ContentPage>
  );
}
