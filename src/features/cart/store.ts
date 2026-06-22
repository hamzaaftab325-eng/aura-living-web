"use client";

/* ============================================================================
   features/cart/store.ts — Zustand cart store with persist
   Source: Architecture Plan v1.1 §3.5
   - persist middleware (localStorage key: aura-living-cart)
   - skipHydration: true (prevents SSR mismatch)
   ============================================================================ */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
  couponCode: string | null;
  couponDiscount: number; // percentage
  // Actions
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  // Computed (as methods to avoid re-render issues)
  itemCount: () => number;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
}

const MOCK_COUPONS: Record<string, number> = {
  WELCOME10: 10,
  EID25: 25,
  FREESHIP: 0, // free shipping handled separately
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      couponCode: null,
      couponDiscount: 0,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
              drawerOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, quantity }],
            drawerOpen: true,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      applyCoupon: (code) => {
        const upper = code.toUpperCase().trim();
        if (!upper) {
          return { success: false, message: "Please enter a coupon code." };
        }
        if (!(upper in MOCK_COUPONS)) {
          return { success: false, message: "This coupon code is not valid." };
        }
        const discount = MOCK_COUPONS[upper];
        set({ couponCode: upper, couponDiscount: discount });
        return {
          success: true,
          message:
            discount > 0
              ? `Coupon applied — ${discount}% off your order.`
              : "Coupon applied — free shipping unlocked.",
        };
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      discount: () => {
        const sub = get().subtotal();
        const pct = get().couponDiscount;
        return Math.round((sub * pct) / 100);
      },

      total: () => {
        const sub = get().subtotal();
        const disc = get().discount();
        return sub - disc;
      },
    }),
    {
      name: "aura-living-cart",
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);

/* Wishlist store — simpler, just slugs */
interface WishlistState {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) => {
        set((state) => ({
          slugs: state.slugs.includes(slug)
            ? state.slugs.filter((s) => s !== slug)
            : [...state.slugs, slug],
        }));
      },
      has: (slug) => get().slugs.includes(slug),
      remove: (slug) => set((state) => ({ slugs: state.slugs.filter((s) => s !== slug) })),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "aura-living-wishlist",
      skipHydration: true,
    }
  )
);
