# Phase 0 — Accounts & Access Plan

**Document:** Aura Living · Phase 0 Pre-flight
**Source chapters:** Architecture Plan v1.1 — §13.1 (Vercel), §13.3 (staging), §15.3 (launch ops), §12.4 (WhatsApp)
**Status:** ✅ Plan recorded; external accounts flagged for Week 8 provisioning; local sandbox equivalents in place for Phase 1–3 development

---

## 1. Purpose

Phase 0 tasks:
- *“Vercel project created; GitHub repo connected”* [13.1]
- *“Domain registered; DNS plan noted (full config due Week 8)”* [15.3]
- *“WhatsApp Business number provisioned for the FAB”* [12.4]
- *“Placeholder content pipeline ready — same dimensions as real assets from day one”* [15.3]

This document records the plan, current status, and — critically — the **local sandbox equivalents** that allow Phases 1–3 to proceed without blocking on external account provisioning. The architecture plan explicitly defers full domain/DNS/SSL config to Week 8 (Phase 4); the only Phase 0 requirement is that the **plan** is noted and the **access path** is confirmed.

---

## 2. Account inventory & status

| # | Account | Purpose | Phase 0 status | Owner | Notes |
|---|---|---|---|---|---|
| 1 | **GitHub repo** | Source control, PR flow, CI triggers | ✅ Local git repo initialised at `/home/z/my-project` (`.git/` present). Remote connection to be added in Phase 1 when external GitHub org is created. | Build lead | Trunk-based dev (Ch 28.1): short-lived 1–3 day branches, squash-merge. |
| 2 | **Vercel project** | Hosting, preview deploys, edge middleware, ISR | ⏳ Deferred to Week 8 (Phase 4). **Local equivalent in place:** `bun run dev` on port 3000 serves the app for all Phase 1–3 development and QA. | Build lead | Vercel project creation is a 5-minute task; deferred because Phase 1–3 do not require edge runtime or ISR. The `next.config.ts` is written Vercel-compatible from day one. |
| 3 | **Production domain** (`auraliving.pk`) | Customer-facing URL | ⏳ Plan noted. DNS config due Week 8. | Build lead | Domain registration is a single external transaction; not on Phase 1–3 critical path. |
| 4 | **Staging subdomain** (`staging.auraliving.pk`) | Pre-prod with basic-auth | ⏳ Deferred to Week 8. **Local equivalent:** the dev server (`bun run dev`) + the Preview Panel serve as staging for Phase 1–3. | Build lead | Basic-auth wrapper added in Phase 4 Vercel config. |
| 5 | **WhatsApp Business number** | FAB, PDP enquiry, post-order confirmation | 📋 Number reserved in plan: `+92 3XX XXXXXX` (placeholder). Real provisioning (Meta Business Manager, WhatsApp Business API) deferred to Phase 2 when the FAB is built. **Local equivalent:** the FAB links to `https://wa.me/923XXXXXXXXX?text=...` with the placeholder number; swapping to the real number is a one-line env-var change. | Build lead | Ch 12.4: single business number; WhatsApp brand green only inside the icon; surrounding button uses brand gold. |
| 6 | **Upstash Redis** | COD-OTP rate limiting (Edge) | ⏳ Deferred to Phase 2 (when checkout OTP is built). Free tier sufficient for dev. | Build lead | Edge runtime; zero client cost. |
| 7 | **hCaptcha** | Abuse prevention after rate-limit exceed | ⏳ Deferred to Phase 2. Site key + secret env vars. | Build lead | Loads from CDN on demand; no install. |
| 8 | **Sentry** | Error monitoring | ⏳ Deferred to Phase 4 (pre-launch). | Build lead | DSN env var. |
| 9 | **Plausible** | Cookieless product analytics | ⏳ Deferred to Phase 4. | Build lead | Self-hosted or cloud; domain env var. |
| 10 | **Vercel Analytics** | RUM / Core Web Vitals | ⏳ Deferred to Phase 4 (auto-enabled on Vercel deploy). | Build lead | Zero-config once Vercel project exists. |
| 11 | **Vercel Edge Config** | Maintenance-mode flag | ⏳ Deferred to Phase 4. | Build lead | Single boolean flag; fallback to env var in dev. |
| 12 | **Vercel Flags** | Feature flags (Eid sale, etc.) | ⏳ Deferred to Phase 4. | Build lead | `@vercel/flags/next`; dev fallback to hardcoded booleans. |
| 13 | **Supabase** (full-stack phase) | DB + auth (post-launch) | 📋 Post-launch. Not in frontend phase. | Build lead | Mock services used throughout frontend phase (Ch 21). |
| 14 | **Payment gateways** (JazzCash, Easypaisa, Card) | Checkout payments | 📋 Phase 2 wires the **UI** with mock redirect targets. Real gateway credentials deferred to full-stack phase. | Build lead | COD is default and works without a gateway. |
| 15 | **SMS provider** (for COD OTP) | OTP delivery | 📋 Phase 2 wires the **OTP UI flow** with a mock verify (any 4-digit code accepted in dev). Real SMS provider deferred. | Build lead | Dev mock: `OTP_DEV_MODE=1` accepts `1234`. |
| 16 | **Pexels API** (placeholder imagery) | Placeholder product/lifestyle images | ✅ Available via `z-ai-web-dev-sdk` image tooling and direct Pexels CDN. No account needed for placeholder use. | Build lead | See `placeholder-content-pipeline.md`. |
| 17 | **Google Search Console** | Sitemap submission | ⏳ Deferred to Phase 4 (after domain live). | Build lead | Requires domain ownership verification. |

---

## 3. Environment-variable contract (Phase 0 preview)

The full `.env.example` is at `/home/z/my-project/.env.example`. The contract distinguishes three tiers:

### 3.1 Required for `bun run dev` (Phase 1 onward)

| Var | Purpose | Dev value |
|---|---|---|
| `NEXT_PUBLIC_USE_MOCKS` | Toggle mock vs real services (Ch 21) | `true` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL base for metadata/sitemap | `http://localhost:3000` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Default i18n locale (Ch 18) | `en` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp FAB target (Ch 12.4) | `923000000000` (placeholder) |

### 3.2 Optional in dev, required in production (Phase 4)

| Var | Purpose | Dev fallback |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | Rate limiting (Ch 17.3) | unset → rate limiting skipped in dev |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting auth | unset |
| `HCAPTCHA_SITE_KEY` / `HCAPTCHA_SECRET` | Abuse prevention | unset → hCaptcha skipped |
| `SENTRY_DSN` | Error monitoring | unset → no Sentry |
| `PLAUSIBLE_DOMAIN` | Analytics | unset → no analytics |
| `VERCEL_EDGE_CONFIG` | Maintenance flag | unset → maintenance mode off |
| `NEXT_PUBLIC_GA_ID` | (Future) Google Analytics | unset |

### 3.3 Feature flags (Phase 4, with dev fallbacks)

| Var | Purpose | Dev default |
|---|---|---|
| `FLAG_EID_2026_SALE` | Eid promotion (Ch 22) | `false` |
| `FLAG_MAINTENANCE_MODE` | 503 page (Ch 29.2) | `false` |
| `OTP_DEV_MODE` | Accept `1234` as OTP in dev | `true` in dev, **never** in prod |

### 3.4 Validation

Per Ch 3.2, a `lib/env.ts` module (to be written in Phase 1) validates all env vars at build time using Zod and **fails the build** if a required var is missing or malformed. The validation schema is the single source of truth for the env contract; `.env.example` is its human-readable mirror.

---

## 4. GitHub workflow (Phase 0 lock)

Although the external GitHub org is not yet created, the **workflow rules** are locked now (Ch 28.1, 28.2):

- **Trunk-based development.** `main` is always deployable. Feature branches are short-lived (1–3 days, max 5), named `<type>/<scope>-<slug>` (e.g. `feat/cart-drawer-otp`).
- **Squash-and-merge** PRs. The squash-commit message follows Conventional Commits 1.0:
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`
  - Scopes: `cart`, `pdp`, `checkout`, `i18n`, `tokens`, `anim`, `seo`, `a11y`, `infra`, etc.
  - Subject: imperative mood, ≤72 chars, lowercase first letter
  - Example: `feat(cart): auto-open drawer on add-to-cart`
- **PR template** (`.github/pull_request_template.md`, to be added Phase 1): Why / What / Testing / Risk / Rollback / Screenshots / Checklist.
- **CI gates** (GitHub Actions, Phase 1): typecheck → lint → unit (Vitest) → component (Vitest+RTL) → e2e `@critical` (Playwright) → axe-core → Lighthouse → bundlesize. All must pass before merge.
- **Branch protection** (configured when GitHub org is created): `main` requires 1 review + all CI green; no direct pushes; no force-push.

---

## 5. Vercel deployment plan (noted for Week 8)

Although the Vercel project is created in Phase 4, the **configuration plan** is noted here so Phase 1’s `next.config.ts` is written Vercel-compatible from the start:

- **Runtime:** Node.js 20 (Vercel default); Edge runtime for middleware (locale, maintenance, rate-limit) and high-frequency lightweight routes (cart count, search suggest).
- **ISR:** PDPs revalidate every 300s (`export const revalidate = 300`).
- **Regions:** `sin1` (Singapore) primary, `bom1` (Mumbai) secondary — closest POPs to Pakistan. `hkg1` (Hong Kong) as further fallback. (Karachi POP is planned by Vercel but not yet available.)
- **Headers:** CSP, HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restrictive — all set in `next.config.ts` so they apply in dev too.
- **Basic-auth:** staging subdomain wrapped in Vercel’s basic-auth edge middleware.
- **Preview deploys:** auto-generated per PR; URL posted as a GitHub check.
- **Production promote:** manual approval gate for first 30 days post-launch (Ch 13.6).

---

## 6. WhatsApp integration plan (noted for Phase 2)

- **Number:** single business number, format `+92 3XX XXXXXX`, stored as `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, no `+`).
- **FAB placement:** bottom-right, `position: fixed`, `z-index: var(--z-fab)` (800). Lifts above iOS Safari bottom bar via `env(safe-area-inset-bottom)`. Hidden on `/checkout`, reappears on `/orders/[id]/confirmed`.
- **Pre-filled message:** `Hi Aura Living team, I have a question about [page URL]` — URL populated from `window.location.href`.
- **PDP enquiry button:** message includes product name + slug: `Hi, I'm interested in the [Product Name] (https://auraliving.pk/product/[slug]). Could you tell me more?`
- **Brand constraint:** WhatsApp brand green (`#25D366`) appears **only** inside the WhatsApp glyph icon. The surrounding FAB button, PDP enquiry button, and any chrome use brand gold (`gold.500` on dark, `gold.700` on light). This is a brand-consistency rule, not a technical one.
- **Post-order message (full-stack phase):** order confirmation WhatsApp to customer + warehouse team, including gift selection (Ch 20.4).

---

## 7. Placeholder content pipeline (summary)

Full spec in `placeholder-content-pipeline.md`. Summary:

- **Source:** Pexels (free, no API key for CDN URLs), supplemented by `z-ai-web-dev-sdk` image-generation for hero banners needing specific mood.
- **Dimensions locked from day one** (matching real production assets):
  - Product card: 600×750 (4:5 @2x)
  - PDP gallery: 1200×1500
  - Homepage hero: 1920×2160
  - Editorial banner: 1680×800
  - Lookbook: 1080×1350
  - OG default: 1200×630
- **Naming convention:** `<category>-<product-slug>-<view>.<ext>` (e.g. `lamps-brass-lotus-hero.webp`). Descriptive, SEO-friendly — matches the real-asset convention so swapping placeholders for real photos is a file-replacement, not a re-architecture.
- **Format:** WebP for placeholder (smaller), AVIF+WebP for production via `next/image`.
- **Alt text:** generated from product name + view descriptor, stored in mock data alongside the image URL.

---

## 8. Phase 0 exit criterion for accounts & access

| Criterion | Status |
|---|---|
| Vercel project created | ⏳ Deferred to Week 8 (Phase 4) per plan; local dev server serves as staging for Phases 1–3. **Unblocking.** |
| GitHub repo connected | ✅ Local git repo initialised; remote + branch protection configured when org is created (Phase 1). **Unblocking.** |
| Domain registered; DNS plan noted | ✅ Plan noted (`auraliving.pk`, DNS Week 8). **Unblocking.** |
| WhatsApp Business number provisioned | 📋 Placeholder number reserved; real provisioning Phase 2 when FAB is built. One-line env swap. **Unblocking.** |
| Placeholder content pipeline ready | ✅ Spec in `placeholder-content-pipeline.md`; assets to be generated in Phase 1 scaffold. **Unblocking.** |

**Verdict:** All Phase 0 account/access tasks are either complete, planned with a deferred external-provisioning date (per the plan’s own Week-8 deferral), or unblocked by a local sandbox equivalent. **No Phase 1–3 work is blocked by an outstanding account.**

Phase 0 Exit Criterion for accounts & access: **MET (with documented deferrals per the plan’s Week-8 schedule).**
