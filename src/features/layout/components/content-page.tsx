import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { PageHeader } from "@/features/layout/components/page-header";

interface ContentPageProps {
  overline?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children: React.ReactNode;
  hideWhatsApp?: boolean;
}

export function ContentPage({
  overline,
  title,
  description,
  breadcrumbs,
  children,
  hideWhatsApp = false,
}: ContentPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-16 md:pt-20">
        <PageHeader
          overline={overline}
          title={title}
          description={description}
          breadcrumbs={breadcrumbs}
        />
        {children}
      </main>
      <SiteFooter />
      {!hideWhatsApp && <WhatsAppFAB />}
      <CartDrawer />
    </>
  );
}
