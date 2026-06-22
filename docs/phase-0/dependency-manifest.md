# Phase 0 — Reconciled Dependency Manifest

**Document:** Aura Living · Phase 0 Pre-flight
**Source:** Architecture Plan v1.1 — Appendix B (pinned versions) + Ch 16–29 (v1.1 additions)
**Purpose:** Single source of truth for every dependency, its pinned version, its budget role, and its install phase. Confirms App. B accounts for `next-intl`, `@tanstack/react-query`, PWA tooling, and `size-limit` (Phase 0 task).

---

## How to read this manifest

- **Status** = `installed` (already in `package.json`), `to-install` (Phase 1+), or `dev-only` (never shipped to production).
- **Phase** = the build phase in which the dependency is first installed and used.
- **Budget** = which Phase 0 budget bucket it counts against (see `budget-reconciliation.md`).
- **Plan ref** = the architecture-plan chapter that mandates it.

---

## 1. Core framework & language (App. B)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `next` | 16.0.0 | `^16.1.1` ✅ | 1 | Framework 40 KB | 3.1 |
| `react` / `react-dom` | 19.2.0 (via Next 16) | `^19.0.0` ✅ | 1 | Framework 40 KB | 3.1 |
| `typescript` | 5.7.2 | `^5` ✅ | 1 | dev-only | 3.1 |
| `tailwindcss` | 4.0.0 | `^4` ✅ | 1 | dev-only | 5.1 |
| `@tailwindcss/postcss` | latest | `^4` ✅ | 1 | dev-only | 5.1 |

**Reconciliation note:** Installed versions meet or exceed pinned versions. No action.

---

## 2. UI primitives & utilities (App. B + Ch 8.1)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| shadcn/ui (Radix-based) | latest | via `@radix-ui/*` ✅ | 1 | UI/utils 12 KB | 8.1 |
| `class-variance-authority` | 0.7.1 | `^0.7.1` ✅ | 1 | UI/utils | 8.1 |
| `clsx` | 2.1.1 | `^2.1.1` ✅ | 1 | UI/utils | 8.1 |
| `tailwind-merge` | 2.6.0 | `^3.3.1` ✅ | 1 | UI/utils | 8.1 |
| `lucide-react` | 0.468.0 | `^0.525.0` ✅ | 1 | UI/utils (tree-shaken per-icon) | 8.1 |
| `cmdk` | latest | `^1.1.1` ✅ | 1 | UI/utils | 8.1 (search overlay) |
| `vaul` | latest | `^1.1.2` ✅ | 1 | UI/utils (Sheet/Drawer) | 8.1 |
| `sonner` | latest | `^2.0.6` ✅ | 1 | UI/utils (Toast) | 8.1 |
| `embla-carousel-react` | latest | `^8.6.0` ✅ | 2 | UI/utils (PDP gallery) | 7.3.1 |
| `react-resizable-panels` | latest | `^3.0.3` ✅ | 2 | UI/utils (optional) | — |
| `react-day-picker` | latest | `^9.8.0` ✅ | 2 | UI/utils (date pickers) | — |
| `react-markdown` | latest | `^10.1.0` ✅ | 2 | UI/utils (journal render) | 7.17 |
| `input-otp` | latest | `^1.4.2` ✅ | 2 | UI/utils (COD OTP) | 12.1 |
| `uuid` | latest | `^11.1.0` ✅ | 1 | UI/utils (IDs) | — |
| `date-fns` | latest | `^4.1.0` ✅ | 1 | UI/utils | — |

**Reconciliation note:** All present. `next-themes` (`^0.4.6`) is installed and available though the plan defers a user-toggleable theme; it will be used for the PWA `theme_color` swap and future dark mode. `react-syntax-highlighter`, `recharts`, `@mdxeditor/editor`, `@dnd-kit/*`, `@reactuses/core`, `react-table` are pre-existing in the sandbox but **not part of the Aura Living manifest** — they will be left installed (no harm) but not imported into Aura Living code paths unless a specific feature requires them.

---

## 3. Animation (App. B + Ch 6)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `gsap` | 3.13.0 | ❌ to-install | 3 | Animation 80 KB (30 KB core) | 6.2 |
| `@gsap/react` | 2.1.2 | ❌ to-install | 3 | Animation (2 KB) | 6.2 |
| `framer-motion` (aka `motion`) | 11.15.0 | `^12.23.2` ✅ | 3 | Animation (30 KB) | 6.3 |
| `lenis` | 1.1.13 | ❌ to-install | 3 | Animation (6 KB) | 6.4 |

**Reconciliation note:** `framer-motion` is installed at v12 (the rebranded `motion` package line). The v1.1 plan pins `motion@11.15.0`; v12 is the successor and API-compatible for the features Aura Living uses (`whileInView`, `AnimatePresence`, `useMotionValue`, `useSpring`). Accepted as a superset. `gsap`, `@gsap/react`, `lenis` to be installed in Phase 3 (not Phase 1) — they are not needed for the plain Phase 2 build and installing early risks accidental first-paint import. This sequencing is itself a budget-protection decision (see ADR-0001 §6).

---

## 4. State, data & forms (App. B + Ch 21, 3.5, 3.6)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `zustand` | 5.0.2 | `^5.0.6` ✅ | 1 | UI/utils (cart store) | 3.5 |
| `@tanstack/react-query` | latest (v5) | `^5.82.0` ✅ | 2 | Tier B +13 KB | 21.1 |
| `react-hook-form` | 7.54.0 | `^7.60.0` ✅ | 2 | UI/utils | 3.6 |
| `@hookform/resolvers` | 3.9.1 | `^5.1.1` ✅ | 2 | UI/utils | 3.6 |
| `zod` | 3.24.1 | `^4.0.2` ✅ | 1 | UI/utils | 3.6, 20 |

**Reconciliation note:** `zod` v4 installed (plan pins v3.24). v4 is API-compatible for the discriminated-union schemas Aura Living needs (Ch 20 gift options) and ships smaller. Accepted. `@tanstack/react-query` confirmed present — this is the Phase 0 task *“Confirm next-intl, @tanstack/react-query, next-pwa/Workbox and size-limit are in the manifest.”* ✅

---

## 5. Internationalization (Ch 18)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `next-intl` | v3.x | `^4.3.4` ✅ | 1 | Tier A +14 KB / Tier B +14 KB | 18.1 |

**Reconciliation note:** `next-intl` v4 installed (plan says v3.x). v4 is the current App-Router-native major with first-class RSC support and the message-loader API the plan relies on. Accepted as a superset. Confirmed present — Phase 0 task satisfied. ✅

---

## 6. Search (Ch 26)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `flexsearch` | latest | ❌ to-install | 2 | Excluded (lazy) | 26.1 |

**Reconciliation note:** Deferred to Phase 2 when the search overlay is built. Lazy-imported on first open — never counts against First Load JS.

---

## 7. PWA / offline (Ch 19)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `@serwist/next` | latest | ❌ to-install | 4 | Excluded (SW) | 19.2 |

**Reconciliation note:** Deferred to Phase 4 (SEO & Performance). The plan names Serwist (not `next-pwa`/Workbox directly — Serwist is the maintained Workbox successor for Next 16). Phase 0 task *“Confirm next-pwa/Workbox … are in the manifest”* is satisfied by recording Serwist as the chosen successor. ✅

---

## 8. Testing (Ch 16)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `vitest` | 2.1.8 | ❌ to-install | 1 | dev-only | 16.1 |
| `@testing-library/react` | 16.1.0 | ❌ to-install | 1 | dev-only | 16.2 |
| `@testing-library/jest-dom` | latest | ❌ to-install | 1 | dev-only | 16.2 |
| `@testing-library/user-event` | latest | ❌ to-install | 1 | dev-only | 16.2 |
| `@playwright/test` | 1.49.0 | ❌ to-install | 1 | dev-only | 16.3 |
| `msw` | latest | ❌ to-install | 2 | dev-only | 16.3 |
| `@axe-core/playwright` | 4.10.1 | ❌ to-install | 5 | dev-only | 16.6 |
| `@lhci/cli` | 0.14.0 | ❌ to-install | 4 | dev-only | 16.6 |

**Reconciliation note:** All dev-only — never ship to production, zero impact on runtime budgets. Vitest + RTL + Playwright installed in Phase 1; MSW in Phase 2 (when mock layer is built); axe + LHCI in Phase 4/5.

---

## 9. Bundle enforcement (Ch 6.7, 10.3)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `size-limit` | latest | ❌ to-install | 1 | dev-only | 10.3 |
| `@size-limit/file` | latest | ❌ to-install | 1 | dev-only | 10.3 |
| `bundlesize` | 0.18.2 | ❌ to-install (alt) | 1 | dev-only | 6.7 |

**Reconciliation note:** Phase 0 task *“Confirm … size-limit are in the manifest”* ✅ — recorded here, to be installed in Phase 1. The plan mentions both `bundlesize` and `size-limit`; `size-limit` is the primary (richer config, per-route budgets — see `budget-reconciliation.md` §5), `bundlesize` is the fallback guard. Confirmed present in manifest. ✅

---

## 10. Security & resilience (Ch 17, 19.4)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `@upstash/redis` | latest | ❌ to-install | 2 | Excluded (edge) | 17.3 |
| `@upstash/ratelimit` | latest | ❌ to-install | 2 | Excluded (edge) | 17.3 |
| `hcaptcha` (via script) | — | n/a (CDN) | 2 | Excluded (CDN) | 17.3 |
| `rehype-sanitize` | latest | ❌ to-install | 2 | dev-only (build-time) | 17.2 |

**Reconciliation note:** Upstash runs in Edge middleware — zero client bundle cost. hCaptcha loads from CDN on demand. `rehype-sanitize` runs at MDX build time, not runtime. None affect the runtime budgets.

---

## 11. Feature flags & ops (Ch 28.4, 29.2)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `@vercel/flags/next` | latest | ❌ to-install | 4 | Excluded (server) | 28.4 |
| `@vercel/edge-config` | latest | ❌ to-install | 4 | Excluded (edge) | 29.2 |

**Reconciliation note:** Both run server-side (Edge). No client bundle cost. Installed in Phase 4 alongside the PWA + cookie-consent work.

---

## 12. Auth (deferred)

| Dependency | Pinned | Installed | Phase | Budget | Plan ref |
|---|---|---|---|---|---|
| `next-auth` | v4 | `^4.24.11` ✅ | (deferred) | — | 7.6 |

**Reconciliation note:** The plan defers real auth to the full-stack (Supabase) phase. `next-auth` is pre-installed in the sandbox and available, but the frontend phase ships placeholder `/login` and `/register` pages only. No budget allocation in the frontend phase.

---

## 13. Fonts (Ch 5.3.2)

| Asset | Loading | Phase | Budget | Plan ref |
|---|---|---|---|---|
| Fraunces (variable serif, 400–700 + italic) | `next/font/google`, `display: swap`, self-hosted | 1 | Excluded from JS (CSS-only) | 5.3.2 |
| Inter (variable sans, 400–700) | `next/font/google`, `display: swap`, self-hosted | 1 | Excluded from JS (CSS-only) | 5.3.2 |
| Noto Nastaliq Urdu (1.2 MB woff2) | `@font-face`, scoped to `[dir="rtl"]`, lazy | 1 | Excluded (lazy, Urdu only) | 18.3 |

**Reconciliation note:** Fonts are CSS-only payloads, not JS. They are tracked under the 800 KB mobile page-weight budget (Phase 4), not the First Load JS budget.

---

## 14. Image pipeline (Ch 10.2)

| Asset | Phase | Budget | Plan ref |
|---|---|---|---|
| `sharp` (already installed `^0.34.3` ✅) | 1 | Server-side only | 10.2 |
| `next/image` (built-in, AVIF + WebP) | 1 | Excluded from JS | 10.2 |

---

## 15. Install-phase summary

| Phase | New installs | First-paint impact |
|---|---|---|
| **1 — Foundation** | `size-limit`, `@size-limit/file`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@playwright/test` | None (all dev-only) |
| **2 — Core Pages** | `flexsearch`, `msw`, `@upstash/redis`, `@upstash/ratelimit`, `rehype-sanitize` | `flexsearch` lazy; Upstash edge; rest dev/build-only |
| **3 — Polish & Animations** | `gsap`, `@gsap/react`, `lenis` | +44 KB animation (desktop-lazy, counted in 80 KB budget) |
| **4 — SEO & Performance** | `@serwist/next`, `@vercel/flags/next`, `@vercel/edge-config`, `@lhci/cli` | SW/edge/dev-only — none first-paint |
| **5 — Pre-Launch QA** | `@axe-core/playwright` | dev-only |

---

## 16. Manifest reconciliation verdict

✅ **Every dependency from Appendix B and the fourteen v1.1 chapters is accounted for.**
✅ **`next-intl`, `@tanstack/react-query`, Serwist (PWA), and `size-limit` are confirmed in the manifest.**
✅ **The 80 KB animation budget holds (zero headroom, by design).**
✅ **The 130 KB First Load JS budget holds for Tier A routes; Tier B routes carry a documented +5 KB carve-out (135 KB) recorded in ADR-0001.**
✅ **No unresolved conflict.**

Phase 0 Exit Criterion for dependency manifest: **MET.**
