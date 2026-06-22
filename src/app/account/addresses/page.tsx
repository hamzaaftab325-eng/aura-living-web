import { ContentPage } from "@/features/layout/components/content-page";
import { Plus, Edit2, Trash2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Addresses",
  description: "Your saved shipping addresses.",
  alternates: { canonical: "/account/addresses" },
  robots: { index: false },
};

const ADDRESSES = [
  {
    id: 1,
    label: "Home",
    name: "Ayesha Khan",
    line1: "House 12, Street 5, Khadda Market",
    city: "Karachi",
    province: "Sindh",
    postal: "74000",
    phone: "0300 1234567",
    default: true,
  },
  {
    id: 2,
    label: "Office",
    name: "Ayesha Khan",
    line1: "Floor 4, Clifton Center, Block 7",
    city: "Karachi",
    province: "Sindh",
    postal: "75600",
    phone: "0300 1234567",
    default: false,
  },
];

export default function AddressesPage() {
  return (
    <ContentPage
      overline="My Account"
      title="Saved Addresses"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Addresses" }]}
    >
      <section className="container-page section-y">
        <div className="grid md:grid-cols-2 gap-4">
          {ADDRESSES.map((addr) => (
            <div key={addr.id} className="bg-white border border-[#F0EBDC] rounded-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-[#C9A84C]/10 text-[#8A6B26] text-caption font-medium rounded-sm">
                    {addr.label}
                  </span>
                  {addr.default && (
                    <span className="px-2 py-1 bg-[#2E7D5B]/10 text-[#2E7D5B] text-caption font-medium rounded-sm">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-[#8A8275] hover:text-[#8A6B26] p-1" aria-label="Edit address">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-[#8A8275] hover:text-[#B23A3A] p-1" aria-label="Delete address">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium">{addr.name}</p>
              <p className="text-body-sm text-[#5A5A5A]">{addr.line1}</p>
              <p className="text-body-sm text-[#5A5A5A]">{addr.city}, {addr.province}</p>
              <p className="text-body-sm text-[#5A5A5A]">{addr.postal}</p>
              <p className="text-body-sm text-[#5A5A5A] mt-2">{addr.phone}</p>
            </div>
          ))}

          {/* Add new */}
          <button className="border-2 border-dashed border-[#F0EBDC] rounded-sm p-6 flex flex-col items-center justify-center text-[#8A8275] hover:border-[#8A6B26] hover:text-[#8A6B26] transition-colors min-h-[200px]">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Add new address</span>
          </button>
        </div>
      </section>
    </ContentPage>
  );
}
