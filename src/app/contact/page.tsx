import { ContentPage } from "@/features/layout/components/content-page";
import { MessageCircle, Mail, MapPin, Clock, Phone } from "lucide-react";
import { WHATSAPP_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about an order, a product, or a custom request? Reach Aura Living on WhatsApp, email, or through our contact form. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ContentPage
      overline="Get in Touch"
      title="We would love to hear from you."
      description="Whether you are asking about an order, considering a custom piece, or just want to talk about your home — we are here. Pakistani customers, Pakistani hours, Pakistani patience."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
    >
      <section className="container-page section-y">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-h2 mb-6">Reach us directly</h2>
            <div className="space-y-6">
              <a
                href={`https://wa.me/${WHATSAPP_CONFIG.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 hover:bg-[#FAF8F2] rounded-sm transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-base font-semibold mb-1 group-hover:text-[#8A6B26]">WhatsApp (fastest)</p>
                  <p className="text-body-sm text-[#5A5A5A]">+92 300 0000000</p>
                  <p className="text-caption text-[#8A8275] mt-1">{WHATSAPP_CONFIG.businessHours}</p>
                </div>
              </a>

              <a href="mailto:hello@auraliving.pk" className="flex items-start gap-4 p-4 hover:bg-[#FAF8F2] rounded-sm transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#8A6B26]" />
                </div>
                <div>
                  <p className="text-base font-semibold mb-1 group-hover:text-[#8A6B26]">Email</p>
                  <p className="text-body-sm text-[#5A5A5A]">hello@auraliving.pk</p>
                  <p className="text-caption text-[#8A8275] mt-1">We reply within one business day</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#8A6B26]" />
                </div>
                <div>
                  <p className="text-base font-semibold mb-1">Studio</p>
                  <p className="text-body-sm text-[#5A5A5A]">Khadda Market, Karachi</p>
                  <p className="text-caption text-[#8A8275] mt-1">By appointment only</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#8A6B26]" />
                </div>
                <div>
                  <p className="text-base font-semibold mb-1">Business Hours</p>
                  <p className="text-body-sm text-[#5A5A5A]">Monday–Saturday: 10am – 8pm PKT</p>
                  <p className="text-caption text-[#8A8275] mt-1">Closed Sundays and public holidays</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#F0EBDC]">
              <p className="text-overline text-[#5A5A5A] mb-3">Follow us</p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8A6B26] hover:text-[#0A0A0A] transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-h2 mb-6">Send us a message</h2>
            <form className="space-y-4" action="/api/contact" method="post">
              <div>
                <label className="block text-body-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                  placeholder="Your full name"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-body-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-medium mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                    placeholder="0300 1234567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Subject *</label>
                <select
                  name="subject"
                  required
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26]"
                >
                  <option value="">Select a topic</option>
                  <option>Order enquiry</option>
                  <option>Product question</option>
                  <option>Custom / bulk order</option>
                  <option>Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-body-sm font-medium mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  className="w-full bg-white border border-[#F0EBDC] rounded-sm px-3 py-2.5 outline-none focus:border-[#8A6B26] min-h-[140px]"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="btn-gold w-full">Send Message</button>
              <p className="text-caption text-[#8A8275]">
                We typically reply within one business day. For urgent matters, WhatsApp is faster.
              </p>
            </form>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
