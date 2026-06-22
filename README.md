# Aura Living

> **Light, life, and living beauty — for the home you are becoming.**

Premium home-decor e-commerce frontend for the Pakistani market. Three curated categories — artisanal **lamps**, living **plants**, hand-poured **candles**. Gold-and-black aesthetic with warm-white backgrounds. COD-first checkout, WhatsApp integration, bilingual English/Urdu (RTL).

---

## Status

| Phase | Focus | Status |
|---|---|---|
| **0 — Pre-flight** | Budget reconciliation, decisions locked, accounts & content planned | ✅ **Complete** |
| 1 — Foundation | Stack, tokens, folders, CI/CD, staging | ⏳ Next |
| 2 — Core Pages | Home, PLP, PDP, cart, checkout, confirm | — |
| 3 — Polish & Animations | GSAP, Framer Motion, Lenis, reduced-motion | — |
| 4 — SEO & Performance | Metadata, JSON-LD, image opt, PWA | — |
| 5 — Pre-Launch QA | Cross-browser, a11y, soft launch | — |

**Source of truth:**
- Architecture plan: [`upload/Aura-Living-Frontend-Architecture-Plan-v1.1.pdf`](./upload/) (140 pages, v1.1 June 2026)
- Execution plan: [`upload/Aura-Living-Execution-Plan.docx`](./upload/) (5 phases, 9 weeks)
- Worklog: [`worklog.md`](./worklog.md)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router only) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Animation | GSAP 3.13 + Framer Motion 12 + Lenis 1.1 (Phase 3) |
| State | Zustand (client) + TanStack Query v5 (server) |
| Forms | React Hook Form + Zod |
| i18n | next-intl v4 (English + Urdu RTL) |
| Fonts | Fraunces (display serif) + Inter (body) via `next/font` |
| DB / Auth | Deferred to full-stack phase (Supabase); frontend uses mock services |

---

## Phase 0 deliverables

```
docs/
├── adr/
│   ├── README.md                      # ADR process + index
│   └── 0001-locked-decisions.md       # Locked decisions (brand, tokens, budgets, sequencing)
└── phase-0/
    ├── README.md                      # Phase 0 index & exit-criterion checklist
    ├── budget-reconciliation.md       # 80 KB animation + 130/135 KB First Load JS
    ├── dependency-manifest.md         # Full Appendix B + v1.1 additions
    ├── accounts-and-access.md         # Vercel/GitHub/domain/WhatsApp plan
    └── placeholder-content-pipeline.md # 24 locked image dimensions, naming, sourcing
.env.example                           # Env-var contract (validated by lib/env.ts in Phase 1)
worklog.md                             # Running project worklog
```

---

## Locked decisions (ADR-0001)

1. **Brand** — “Aura Living” is final across repo, tokens, metadata, copy.
2. **Token sovereignty** — four-tier token system in `globals.css` is the single source of truth; no inline styles, no magic numbers; gold-on-light always uses `#8A6B26`.
3. **Non-negotiables** — App Router, RSC-by-default, COD-first checkout, WCAG 2.2 AA.
4. **Bundle budgets** — 80 KB animation (zero headroom); 130 KB First Load JS for marketing routes; 135 KB for data/shop routes (+5 KB carve-out for React Query).
5. **Install sequencing** — `gsap`, `@gsap/react`, `lenis` deferred to Phase 3 install to make the animation budget physically unbreakable during Phases 1–2.
6. **ADR discipline** — active from Phase 0; any deviation requires a superseding ADR before code merges.

---

## Development

```bash
bun run dev      # dev server on :3000
bun run lint     # ESLint
```

**Preview:** use the Preview Panel on the right (or “Open in New Tab”). Do not navigate to `localhost:3000` directly — it is internal to the sandbox.

---

## Project structure (target — Phase 1)

```
src/
├── app/              # App Router routes (thin, mirrors URL)
│   ├── (marketing)/  # /, /about, /contact, /faq, /lookbook, /journal, legal
│   ├── (shop)/       # /shop, /product/[slug], /collections/[slug], /cart, /checkout
│   ├── (account)/    # /account/*, /login, /register
│   └── (editorial)/  # (reserved)
├── features/         # Domain logic (product, cart, checkout, account, home, layout)
├── components/       # Shared UI (animation wrappers, providers)
├── lib/              # env, analytics, seo, format, result, constants
├── services/         # Mock service interfaces (product, collection, content, cart, checkout, search, inventory)
├── hooks/            # use-mounted, use-media-query, use-reduced-motion, use-lenis, use-focus-manager
├── types/            # Shared types
└── utils/            # cn, format-price, slugify, debounce
```

---

## License & ownership

Aura Living — confidential pre-launch. See the architecture plan for full terms.
