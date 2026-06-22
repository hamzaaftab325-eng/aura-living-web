# Phase 0 — Placeholder Content Pipeline

**Document:** Aura Living · Phase 0 Pre-flight
**Source chapters:** Architecture Plan v1.1 — §10.2 (image optimisation), §9.4 (image sitemap), §15.3 (launch ops), §7 (page blueprints)
**Status:** ✅ Spec complete; assets to be generated in Phase 1 scaffold

---

## 1. Purpose

Phase 0 task: *“Placeholder content pipeline ready — same dimensions as real assets from day one”* [15.3].

The architecture plan is explicit (Ch 15.3, risk row “Content delayed from day 1”): **placeholder content with the same dimensions as real assets** must exist from day one. If placeholders use different aspect ratios or filenames than production assets, swapping them later causes layout shift (CLS regressions), broken `next/image` `width`/`height` props, sitemap invalidations, and SEO work that should have been a one-line file swap.

This document locks the **dimensions, naming, format, sourcing, and alt-text conventions** for every image type in the storefront, so that Phase 1’s scaffold can drop placeholders into the layout with the exact same `width`/`height`/`sizes` attributes that production will use.

---

## 2. Image-type inventory (locked dimensions)

Every dimension below is derived from the page blueprints in Ch 7 and the image-optimisation spec in Ch 10.2. Dimensions are the **rendered display size × 2** for retina (the `@2x` source), matching `next/image`’s expected `width`/`height` props.

| # | Image type | Used on | Rendered display | Source `@2x` | Aspect ratio | Plan ref |
|---|---|---|---|---|---|---|
| 1 | **Homepage hero** | `/` | 1920×1080 (desktop), 750×1334 (mobile) | **1920×2160** (covers both via `sizes`) | 16:9 / 9:16 crop | 7.1.2 |
| 2 | **Product card** | PLP, bestsellers, related, wishlist, search | 300×375 (desktop), 164×205 (mobile) | **600×750** | 4:5 portrait | 7.2.2, 8.2 |
| 3 | **PDP gallery — main** | `/product/[slug]` | 600×750 (desktop), 375×469 (mobile) | **1200×1500** | 4:5 portrait | 7.3.1 |
| 4 | **PDP gallery — thumb** | `/product/[slug]` (desktop thumb strip) | 80×100 | **160×200** | 4:5 portrait | 7.3.1 |
| 5 | **Editorial banner** | Homepage, collection headers | 1680×400 (desktop), 750×500 (mobile) | **1680×800** | ~21:10 / 3:2 crop | 7.1.2 |
| 6 | **Collection hero** | `/collections/[slug]` | 1440×500 | **2880×1000** | ~2.88:1 | 7.6 |
| 7 | **Lookbook tile — tall** | `/lookbook` (masonry) | 540×810 (desktop), 375×563 (mobile) | **1080×1620** | 2:3 portrait | 7.11 |
| 8 | **Lookbook tile — short** | `/lookbook` (masonry) | 540×405 (desktop), 375×281 (mobile) | **1080×810** | 4:3 landscape | 7.11 |
| 9 | **Lookbook story hero** | `/lookbook/[slug]` | 1440×600 | **2880×1200** | 2.4:1 | 7.12 |
| 10 | **Journal post card** | `/journal` | 540×360 (desktop), 375×250 (mobile) | **1080×720** | 3:2 landscape | 7.17 |
| 11 | **Journal post hero** | `/journal/[slug]` | 1440×600 | **2880×1200** | 2.4:1 | 7.18 |
| 12 | **About / brand story** | `/about` | 1440×700 | **2880×1400** | ~2:1 | 7.11 |
| 13 | **OG default (social)** | All pages (fallback OG) | 1200×630 | **1200×630** (1× — OG spec) | 1.91:1 | 9.5 |
| 14 | **OG product** | PDPs | 1200×630 (crop of #3) | **1200×630** | 1.91:1 | 9.5 |
| 15 | **Favicon** | All pages | 32×32, 16×16 | **32×32** (multi-size ICO) | 1:1 | — |
| 16 | **Apple touch icon** | All pages | 180×180 | **180×180** | 1:1 | — |
| 17 | **PWA icon 192** | PWA manifest | 192×192 | **192×192** | 1:1 | 19.1 |
| 18 | **PWA icon 512** | PWA manifest | 512×512 | **512×512** | 1:1 | 19.1 |
| 19 | **PWA maskable icon** | PWA manifest | 512×512 (with safe zone) | **512×512** | 1:1 | 19.1 |
| 20 | **Empty-cart illustration** | `/cart` empty state | 240×240 | **480×480** | 1:1 | 7.4, 24.1 |
| 21 | **404 illustration** | `/404` | 320×240 | **640×480** | 4:3 | 7.19 |
| 22 | **Order-confirmation checkmark** | `/orders/[id]/confirmed` | 120×120 (SVG) | **SVG** (vector) | 1:1 | 7.20 |
| 23 | **Testimonial avatar** | Homepage testimonials | 48×48 (desktop), 40×40 (mobile) | **96×96** | 1:1 | 7.1.2 |
| 24 | **Category tile** | Homepage CategoryTiles | 480×360 (desktop), 375×280 (mobile) | **960×720** | 4:3 | 7.1.2 |

**Total distinct source dimensions: 24** (some reused across pages via `sizes`).

---

## 3. File-naming convention (locked)

Per Ch 27.2 (image SEO): *“descriptive filenames (`brass-lotus-lamp-hero-1200.webp`, not `IMG_4892.jpg`)”*.

### 3.1 Pattern

```
<category>-<product-slug>-<view>-<width>.<ext>
```

- `<category>`: `lamps` | `plants` | `candles` | `editorial` | `lookbook` | `journal` | `brand` | `og` | `icon` | `illustration`
- `<product-slug>`: kebab-case, matches the product’s `slug` field in mock data (e.g. `brass-lotus-lamp`, `monstera-deliciosa-medium`, `saffron-oud-candle`)
- `<view>`: `hero` | `main` | `detail` | `lifestyle` | `dimensions` | `thumb` | `card` | `banner` | `tile` | `avatar` | `og`
- `<width>`: the source image’s actual pixel width (e.g. `600`, `1200`, `1920`) — enables the image sitemap to reference the canonical source
- `<ext>`: `webp` for placeholders, `avif`/`webp` for production (served via `next/image` which auto-negotiates)

### 3.2 Examples

```
lamps-brass-lotus-lamp-main-1200.webp        # PDP gallery main
lamps-brass-lotus-lamp-thumb-160.webp         # PDP thumb strip
lamps-brass-lotus-lamp-card-600.webp          # PLP/bestsellers card
lamps-brass-lotus-lamp-detail-1200.webp       # PDP detail shot
lamps-brass-lotus-lamp-lifestyle-1200.webp    # PDP lifestyle shot
plants-monstera-deliciosa-medium-main-1200.webp
candles-saffron-oud-candle-main-1200.webp
editorial-monsoon-edit-banner-1680.webp       # Editorial banner
brand-hero-home-1920.webp                     # Homepage hero
brand-about-story-2880.webp                   # About page
og-default-1200.png                           # OG default (PNG for compatibility)
icon-favicon-32.ico                           # Favicon
icon-apple-touch-180.png                      # Apple touch icon
icon-pwa-192.png, icon-pwa-512.png, icon-pwa-maskable-512.png
illustration-empty-cart-480.webp
illustration-404-640.webp
```

### 3.3 Why this matters

- **Image sitemap (Ch 27.2):** the sitemap references the canonical source URL; the width suffix makes the source unambiguous.
- **Swap-invariance:** when real product photography arrives, the file is named `lamps-brass-lotus-lamp-main-1200.avif` and dropped into the same path. The `next/image` `src` prop, the `width`/`height`, the `sizes`, the alt text, and the sitemap entry all stay identical. Zero code changes.
- **Debuggability:** a 404 on `lamps-brass-lotus-lamp-main-1200.webp` tells you exactly which product, which view, which size is missing.

---

## 4. File-location convention (locked)

```
public/
├── icons/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable-512.png
├── og/
│   └── og-default-1200.png
├── products/
│   ├── lamps/
│   │   ├── brass-lotus-lamp/
│   │   │   ├── main-1200.webp
│   │   │   ├── thumb-160.webp
│   │   │   ├── card-600.webp
│   │   │   ├── detail-1-1200.webp
│   │   │   ├── detail-2-1200.webp
│   │   │   ├── lifestyle-1-1200.webp
│   │   │   └── dimensions-1200.webp
│   │   └── ... (other lamps)
│   ├── plants/
│   │   └── monstera-deliciosa-medium/
│   │       └── ...
│   └── candles/
│       └── saffron-oud-candle/
│           └── ...
├── editorial/
│   ├── monsoon-edit-banner-1680.webp
│   └── brass-and-linen-banner-1680.webp
├── lookbook/
│   ├── tile-tall-01-1080.webp
│   └── tile-short-01-1080.webp
├── journal/
│   └── caring-for-monstera-in-karachi-2880.webp
├── brand/
│   ├── hero-home-1920.webp
│   ├── about-story-2880.webp
│   └── logo.svg
└── illustrations/
    ├── empty-cart-480.webp
    ├── 404-640.webp
    └── checkmark-success.svg
```

**Why a per-product folder:** a single product has 5–8 images (Ch 7.3.1). Grouping them in a folder named by the product slug keeps `public/products/` navigable when the catalog grows to 48 SKUs (240+ images) and avoids filename collisions.

---

## 5. Format & optimisation (locked)

| Format | Use | Notes |
|---|---|---|
| **WebP** | All placeholder raster images | Smaller than JPEG, universally supported. Quality 75 (Phase 4 will serve AVIF via `next/image` automatically). |
| **AVIF** | Production raster (served by `next/image`) | Auto-generated by `next/image` from the WebP source; no manual AVIF files needed. |
| **PNG** | OG default, icons, illustrations with transparency | OG must be PNG/JPG per spec; icons need alpha. |
| **SVG** | Logo, checkmark, simple illustrations | Vector, infinite scalability, tiny. Inline critical SVGs in JSX; reference decorative SVGs by path. |
| **ICO** | Favicon only | Multi-size (16, 32, 48) baked into one `.ico`. |

**`next/image` config (locked in Phase 1):**
- `formats: ['image/avif', 'image/webp']` — AVIF first, WebP fallback
- `quality: 75` default, `80` for products
- `deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2880]` — covers all locked dimensions
- `imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384]` — icons, thumbs, avatars

---

## 6. Sourcing strategy

### 6.1 Product & lifestyle imagery (placeholder)

**Source:** Pexels (free, no API key required for direct CDN URLs).
**Selection criteria:**
- Matches the product category (lamp, plant, candle) and the specific product’s material/colour where possible.
- Warm, premium aesthetic — soft natural light, shallow depth of field, neutral-to-warm backgrounds. Avoid harsh flash, cluttered backgrounds, or stock-photo clichés.
- Pakistani-context where available: brass diya-style lamps, monstera in terracotta pots, candles in ceramic holders that read as South Asian craft.
- **No people in product card images** (focus on the object). Lifestyle shots may include hands or room context.

**Sourcing method:**
- Phase 1: use the `z-ai-web-dev-sdk` **image-search** skill to retrieve Pexels-hosted images for each of the 48 mock SKUs. Store the direct CDN URLs in the mock data file.
- Phase 4: replace with real product photography (same dimensions, same filenames, drop-in swap).

### 6.2 Hero & editorial banners (placeholder)

**Source:** `z-ai-web-dev-sdk` **image-generation** skill for hero/editorial banners that need a specific mood (e.g. “warm candlelit living room, brass lamp glowing, monstera in corner, cinematic, golden hour”). AI generation gives a consistent aesthetic that stock photos cannot match across 6+ banner slots.

**Prompt pattern (locked):**
> “Premium home decor still life, [specific objects], warm golden candlelight, brass and cream palette, soft natural shadows, shallow depth of field, editorial photography, no text, no people, 16:9”

Generate at 1920×1080 (hero) or 1680×800 (editorial banner), export as WebP quality 80.

### 6.3 Illustrations (empty cart, 404, checkmark)

**Source:** hand-authored SVG, drawn in the Aura Living brand style (line-art, gold stroke on cream, warm). SVGs are tiny, infinitely scalable, and on-brand. Authored in Phase 2 when the empty/error states are built.

### 6.4 Icons (favicon, PWA, Apple touch)

**Source:** derived from the Aura Living logo (a brass-lotus mark, to be finalised in Phase 1 design pass). Generated at 16/32/48/180/192/512 from a single SVG master. PWA maskable icon includes the mandatory safe-zone padding (inner 80%).

### 6.5 Avatars (testimonials)

**Source:** Pexels portrait photos, cropped to 96×96 square, warm-toned. Phase 1 uses 6–8 distinct avatars for the testimonial marquee.

---

## 7. Alt-text convention (locked, per Ch 9.2 + 11.3)

Every `<Image>` has an `alt` attribute. Three tiers:

| Tier | Pattern | Example |
|---|---|---|
| **Product image** | `<Product Name> — <view descriptor>` | `Brass Lotus Lamp — main view` / `Brass Lotus Lamp — detail of brass base` |
| **Editorial / hero** | Descriptive sentence, no marketing copy | `Warm-lit living room with a brass lamp and monstera plant at golden hour` |
| **Decorative** (illustration, pattern) | Empty `alt=""` + `aria-hidden="true"` | (empty) — screen readers skip |

**Forbidden:** keyword-stuffed alt (`brass lamp buy online karachi cheap`), generic alt (`image`), missing alt.

The alt text is stored in the mock data alongside the image URL, not hand-typed in JSX, so it stays consistent across PLP/PDP/cart/wishlist reuses of the same image.

---

## 8. Mock-data shape (locked, for Phase 2)

The mock product data (Ch 21.4: 48 SKUs) carries the image references so components never hardcode paths:

```typescript
// services/product/mock.ts (excerpt, full file in Phase 2)
export const mockProducts: Product[] = [
  {
    slug: "brass-lotus-lamp",
    name: "Brass Lotus Lamp",
    category: "lamps",
    price: 8499,            // PKR
    compareAtPrice: 9999,   // optional, for sale display
    currency: "PKR",
    images: [
      { url: "/products/lamps/brass-lotus-lamp/main-1200.webp",   width: 1200, height: 1500, alt: "Brass Lotus Lamp — main view",     view: "main" },
      { url: "/products/lamps/brass-lotus-lamp/detail-1-1200.webp", width: 1200, height: 1500, alt: "Brass Lotus Lamp — detail of brass base", view: "detail" },
      { url: "/products/lamps/brass-lotus-lamp/lifestyle-1-1200.webp", width: 1200, height: 1500, alt: "Brass Lotus Lamp on a side table at dusk", view: "lifestyle" },
      // ... up to 8 images
    ],
    cardImage: { url: "/products/lamps/brass-lotus-lamp/card-600.webp", width: 600, height: 750, alt: "Brass Lotus Lamp" },
    // ...
  },
  // ... 47 more
];
```

This shape makes the placeholder→production swap a data-file change, not a component change.

---

## 9. Phase-1 generation checklist

When the Phase 1 scaffold begins, generate the placeholder asset set in this order (each item is a single batch operation):

1. **Logo + icons** (from one SVG master): favicon.ico, apple-touch-icon-180.png, icon-192.png, icon-512.png, icon-maskable-512.png, `brand/logo.svg`. → 6 files.
2. **OG default**: `og/og-default-1200.png` — Aura Living logo on gold-and-black with tagline. → 1 file.
3. **Homepage hero**: `brand/hero-home-1920.webp` — generated via image-gen skill. → 1 file.
4. **Editorial banners** (2): `editorial/monsoon-edit-banner-1680.webp`, `editorial/brass-and-linen-banner-1680.webp`. → 2 files.
5. **Category tiles** (3): lamps, plants, candles — `editorial/<category>-tile-960.webp`. → 3 files.
6. **Product images** (48 SKUs × ~6 images): retrieved via image-search skill from Pexels, resized/cropped to the locked dimensions via `sharp`. → ~288 files. (This is the bulk; batch-scripted.)
7. **Lookbook tiles** (6): `lookbook/tile-tall-0[1-3]-1080.webp`, `lookbook/tile-short-0[1-3]-1080.webp`. → 6 files.
8. **Journal hero** (1): `journal/caring-for-monstera-in-karachi-2880.webp`. → 1 file.
9. **About hero**: `brand/about-story-2880.webp`. → 1 file.
10. **Illustrations**: `illustrations/empty-cart-480.webp`, `illustrations/404-640.webp`, `illustrations/checkmark-success.svg`. → 3 files.
11. **Testimonial avatars** (8): `brand/avatar-0[1-8]-96.webp`. → 8 files.

**Total: ~317 placeholder files**, all at locked dimensions, all with locked filenames, all referenced by mock data — drop-in replaceable with real assets in Phase 5 without a single line of component code changing.

---

## 10. Phase 0 exit criterion for placeholder content

| Criterion | Status |
|---|---|
| Dimensions locked for every image type | ✅ §2 (24 distinct dimensions) |
| Naming convention locked | ✅ §3 (`<category>-<slug>-<view>-<width>.<ext>`) |
| File-location convention locked | ✅ §4 (per-product folder structure) |
| Format & optimisation locked | ✅ §5 (WebP placeholder, AVIF via next/image) |
| Sourcing strategy decided | ✅ §6 (Pexels for products, AI-gen for heroes, SVG for illustrations) |
| Alt-text convention locked | ✅ §7 (3 tiers) |
| Mock-data shape locked | ✅ §8 (images as structured data, not hardcoded paths) |
| Phase-1 generation checklist ready | ✅ §9 (11-step batch, ~317 files) |

**Verdict:** The placeholder content pipeline is fully specified and ready for Phase 1 generation. Every dimension, filename, and path matches what production will use, so the swap is a file replacement, not a re-architecture. **No CLS regression, no sitemap invalidation, no component-code change at swap time.**

Phase 0 Exit Criterion for placeholder content: **MET.**
