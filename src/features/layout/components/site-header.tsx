"use client";

/* ============================================================================
   SiteHeader — transparent-to-solid on scroll
   Source: Architecture Plan v1.1 §8.2, §7.1.2
   ============================================================================ */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, Heart, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, CATEGORIES } from "@/lib/constants";
import { useCartStore } from "@/features/cart/store";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isTransparent = !scrolled && pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[var(--z-header)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isTransparent
            ? "bg-transparent"
            : "bg-[#0E0E0E] border-b border-white/10 shadow-[0_4px_12px_-2px_rgba(10,10,10,0.08)]"
        )}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-cream p-2 -ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-cream"
              aria-label="Aura Living home"
            >
              <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                Aura
              </span>
              <span className="font-display text-xl md:text-2xl font-light italic text-[#C9A84C]">
                Living
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors flex items-center gap-1",
                      isTransparent
                        ? "text-cream/90 hover:text-[#C9A84C]"
                        : "text-cream/90 hover:text-[#C9A84C]",
                      pathname.startsWith(link.href) && "text-[#C9A84C]"
                    )}
                  >
                    {link.label}
                    {"submenu" in link && link.submenu && (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </Link>
                  {"submenu" in link && link.submenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                      <div className="bg-white border border-[#F0EBDC] rounded-md shadow-[0_8px_24px_-4px_rgba(10,10,10,0.12)] py-2 min-w-[180px]">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-[#2A2A2A] hover:bg-[#FAF8F2] hover:text-[#8A6B26] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="text-cream p-2 hover:text-[#C9A84C] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/account/wishlist"
                className="text-cream p-2 hover:text-[#C9A84C] transition-colors hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={() => useCartStore.getState().openDrawer()}
                className="text-cream p-2 hover:text-[#C9A84C] transition-colors relative"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-[#0E0E0E] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      {mobileOpen && (
        <MobileMenu onClose={() => setMobileOpen(false)} />
      )}

      {/* Search overlay */}
      {searchOpen && (
        <SearchOverlay onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[var(--z-drawer)] lg:hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#FAF8F2] shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#F0EBDC]">
          <span className="font-display text-lg font-semibold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#2A2A2A] hover:text-[#8A6B26]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-6 space-y-1" aria-label="Mobile primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-lg font-display text-[#0A0A0A] hover:text-[#8A6B26] border-b border-[#F0EBDC]/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-[#F0EBDC]">
          <p className="text-overline text-[#5A5A5A] mb-3">Shop by category</p>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="block py-2 text-[#2A2A2A] hover:text-[#8A6B26]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-[#F0EBDC] space-y-2">
          <Link href="/account" className="block py-2 text-sm text-[#5A5A5A] hover:text-[#8A6B26]">
            My Account
          </Link>
          <Link href="/account/wishlist" className="block py-2 text-sm text-[#5A5A5A] hover:text-[#8A6B26]">
            Wishlist
          </Link>
          <Link href="/account/orders" className="block py-2 text-sm text-[#5A5A5A] hover:text-[#8A6B26]">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[var(--z-modal)]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 bg-[#FAF8F2] shadow-2xl">
        <div className="container-page py-6">
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-[#5A5A5A] flex-shrink-0" />
            <input
              type="search"
              autoFocus
              placeholder="Search lamps, plants, candles…"
              className="flex-1 bg-transparent text-lg text-[#0A0A0A] placeholder:text-[#8A8275] outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#2A2A2A] hover:text-[#8A6B26]"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-6 pb-4">
            <p className="text-overline text-[#5A5A5A] mb-3">Popular searches</p>
            <div className="flex flex-wrap gap-2">
              {["Brass lamps", "Monstera", "Saffron & Oud", "Snake plant", "Candles under Rs 2000"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-3 py-1.5 bg-white border border-[#F0EBDC] rounded-full text-sm text-[#2A2A2A] hover:border-[#8A6B26] hover:text-[#8A6B26] transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
