import { SiteHeader } from "@/features/layout/components/site-header";
import { SiteFooter } from "@/features/layout/components/site-footer";
import { WhatsAppFAB } from "@/features/layout/components/whatsapp-fab";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { OrderConfirmation } from "@/features/checkout/components/order-confirmation";

export default function OrderConfirmedPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-24 md:pt-28">
        <OrderConfirmation orderId={"placeholder"} />
      </main>
      <SiteFooter />
      <WhatsAppFAB />
      <CartDrawer />
    </>
  );
}
