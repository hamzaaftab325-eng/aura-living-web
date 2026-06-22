import { ContentPage } from "@/features/layout/components/content-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Update your profile, password, and preferences.",
  alternates: { canonical: "/account/settings" },
  robots: { index: false },
};

export default function SettingsPage() {
  return (
    <ContentPage
      overline="My Account"
      title="Account Settings"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Settings" }]}
    >
      <section className="container-narrow section-y">
        <form className="space-y-8">
          <div>
            <h2 className="text-h4 mb-4 pb-2 border-b border-[#F0EBDC]">Profile</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Ayesha Khan"
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="ayesha@example.com"
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue="0300 1234567"
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-h4 mb-4 pb-2 border-b border-[#F0EBDC]">Password</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                />
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-h4 mb-4 pb-2 border-b border-[#F0EBDC]">Communication Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="accent-[#8A6B26]" />
                <span className="text-body-sm">Order updates (WhatsApp + email)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="accent-[#8A6B26]" />
                <span className="text-body-sm">Newsletter — the Aura Living Letter</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-[#8A6B26]" />
                <span className="text-body-sm">Promotional offers and seasonal sales</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-gold">Save Changes</button>
            <button type="reset" className="btn-outline-gold">Cancel</button>
          </div>
        </form>
      </section>
    </ContentPage>
  );
}
