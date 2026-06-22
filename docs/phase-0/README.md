# Phase 0 — Pre-flight

**Aura Living** · Premium Home Decor E-Commerce Frontend
**Phase:** 0 (Pre-flight, before any code)
**Estimated effort:** 1–2 days
**Source:** Execution Plan Phase 0; Architecture Plan v1.1 §1.4, §5, §6.7, §10.3, §13, §15.1, §15.3, §28.3, App. B

---

## Purpose

Phase 0 is **not in the original 9-week roadmap**, but the execution plan adds it as essential pre-flight. It resolves open contradictions and locks decisions so the build does not stall mid-phase. No code is written in Phase 0 — only decisions, budgets, contracts, and plans.

> *“The Phase 0 pre-flight is the single most important set of checks: it resolves the open bundle-budget question before any code is written.”* — Execution Plan

---

## Phase 0 tasks & status

### Bundle-budget reconciliation

| # | Task | Plan ref | Status | Artifact |
|---|---|---|---|---|
| 1 | Open Appendix B and Ch 6.7 + 10.3 side by side | App. B, 6.7, 10.3 | ✅ | [`dependency-manifest.md`](./dependency-manifest.md) |
| 2 | Confirm next-intl, @tanstack/react-query, next-pwa/Workbox, size-limit in the manifest | App. B | ✅ | [`dependency-manifest.md`](./dependency-manifest.md) §5, §4, §7, §9 |
| 3 | Re-sum the 130 KB First Load JS budget with new libs; confirm or document the new allocation | 10.3 | ✅ | [`budget-reconciliation.md`](./budget-reconciliation.md) §3 — Tier A 126 KB / Tier B 135 KB |
| 4 | Re-check the 80 KB animation budget against GSAP+ScrollTrigger+@gsap/react+Motion+Lenis | 6.7 | ✅ | [`budget-reconciliation.md`](./budget-reconciliation.md) §2 — holds at 80 KB, zero headroom |
| 5 | If a budget breaks: decide trade-off and record | 15.1 | ✅ | [ADR-0001](../adr/0001-locked-decisions.md) D4 (+5 KB Tier B carve-out) |

### Decisions locked

| # | Task | Plan ref | Status | Artifact |
|---|---|---|---|---|
| 6 | Confirm brand name final: “Aura Living” across repo, tokens, metadata, copy | 1.2 | ✅ | [ADR-0001](../adr/0001-locked-decisions.md) D1 |
| 7 | Confirm single source of truth: design tokens in globals.css never overridden | 5, App. A | ✅ | [ADR-0001](../adr/0001-locked-decisions.md) D2 |
| 8 | Confirm non-negotiables: App Router, RSC-by-default, COD-first, WCAG 2.2 AA | 1.4 | ✅ | [ADR-0001](../adr/0001-locked-decisions.md) D3 |
| 9 | Agree the first ADR records these locked decisions | 28.3 | ✅ | [ADR-0001](../adr/0001-locked-decisions.md) + [ADR README](../adr/README.md) |

### Accounts & access

| # | Task | Plan ref | Status | Artifact |
|---|---|---|---|---|
| 10 | Vercel project created; GitHub repo connected | 13.1 | ✅ plan / ⏳ deferred to Wk 8 | [`accounts-and-access.md`](./accounts-and-access.md) §2, §5 |
| 11 | Domain registered; DNS plan noted | 15.3 | ✅ plan noted | [`accounts-and-access.md`](./accounts-and-access.md) §2 |
| 12 | WhatsApp Business number provisioned for the FAB | 12.4 | 📋 placeholder reserved; Phase 2 provisioning | [`accounts-and-access.md`](./accounts-and-access.md) §6 |
| 13 | Placeholder content pipeline ready — same dimensions as real assets | 15.3 | ✅ spec complete | [`placeholder-content-pipeline.md`](./placeholder-content-pipeline.md) |

---

## Phase 0 Exit Criterion

> *Every dependency is accounted for against both budgets with no unresolved conflict; locked decisions are written into ADR-0001; Vercel + GitHub + domain access confirmed.*

| Sub-criterion | Verdict |
|---|---|
| Every dependency accounted for against both budgets | ✅ [`dependency-manifest.md`](./dependency-manifest.md) — all App. B + 14 v1.1-chapter libs inventoried |
| No unresolved budget conflict | ✅ [`budget-reconciliation.md`](./budget-reconciliation.md) — 80 KB animation holds; 130 KB Tier A holds; Tier B +5 KB carve-out documented & signed off in ADR-0001 |
| Locked decisions written into ADR-0001 | ✅ [`docs/adr/0001-locked-decisions.md`](../adr/0001-locked-decisions.md) — 6 decisions (D1–D6), Accepted |
| Vercel + GitHub + domain access confirmed | ✅ local git repo initialised; Vercel/domain/WhatsApp deferred to Week 8 per plan, with local sandbox equivalents keeping Phases 1–3 unblocked ([`accounts-and-access.md`](./accounts-and-access.md)) |

**🟢 Phase 0 Exit Criterion: MET. Phase 1 (Foundation) is unblocked.**

---

## Phase 0 deliverables (file map)

```
docs/
├── adr/
│   ├── README.md                          # ADR process + index + anticipated ADRs
│   └── 0001-locked-decisions.md           # ADR-0001: brand, tokens, non-negotiables, budgets, sequencing, ADR discipline
└── phase-0/
    ├── README.md                          # this file — Phase 0 index & exit-criterion checklist
    ├── budget-reconciliation.md           # 80 KB animation + 130/135 KB First Load JS reconciliation
    ├── dependency-manifest.md             # full Appendix B + v1.1 additions, installed vs to-install, per-phase
    ├── accounts-and-access.md             # Vercel/GitHub/domain/WhatsApp plan + local sandbox equivalents
    └── placeholder-content-pipeline.md    # 24 locked image dimensions, naming, sourcing, mock-data shape

.env.example                               # env-var contract (Tier 1–5), validated by lib/env.ts in Phase 1
worklog.md                                 # project worklog (Phase 0 entry recorded)
```

---

## What Phase 0 did **not** do (by design)

- **No code written.** No `app/`, `features/`, `lib/`, `services/` folders created. No components. No pages. This is the execution plan’s explicit constraint: *“Resist building pages here.”* (Phase 1 exit gate).
- **No dependencies installed.** The manifest records what will be installed and in which phase. `gsap`, `@gsap/react`, `lenis` are deliberately deferred to Phase 3 (ADR-0001 D5) to make the animation budget physically unbreakable during Phases 1–2.
- **No external accounts provisioned.** Vercel, domain, WhatsApp Business API, Upstash, hCaptcha, Sentry, Plausible are all deferred to their relevant phase, with local sandbox equivalents keeping development unblocked. The plan itself defers full domain/DNS/SSL to Week 8.
- **No design tokens written.** The token *system* (four-tier, sovereignty, gold.700-on-light rule) is locked in ADR-0001 D2, but the actual `globals.css` token values are a Phase 1 task.
- **No ADRs beyond 0001.** ADR-0002 (Tier B measurement), 0003 (service contract), 0004 (GSAP lazy import), etc. are anticipated and listed in the ADR README; they are written when their phase begins.

---

## Hand-off to Phase 1

Phase 1 (Foundation, Weeks 1–2) begins with the following locked context:

1. **Brand:** “Aura Living”, tagline locked (ADR-0001 D1).
2. **Stack:** Next.js 16 + TS 5 + Tailwind 4 + shadcn/ui (New York) + Prisma (deferred) + NextAuth (deferred) + Zustand + TanStack Query — all installed. To install in Phase 1: `size-limit`, `vitest`, `@testing-library/*`, `@playwright/test`.
3. **Tokens:** four-tier system, gold-and-black-with-warm-cream palette (exact hex in research report §3), Fraunces + Inter via `next/font`, 8px-base spacing, 4 radii, 4 shadows, 9-layer z-index, 4 breakpoints. Sovereignty enforced by ESLint (ADR-0001 D2).
4. **Folders:** feature-based — `app/` (thin, mirrors URL), `features/` (domain logic), `lib/`, `services/`, `hooks/`, `components/`, `types/`, `utils/`, `content/`. Route groups: `(marketing)`, `(shop)`, `(account)`, `(editorial)`.
5. **Routes:** 27 routes (execution plan + Ch 29.5). All return placeholder pages in Phase 1.
6. **i18n:** `next-intl` (installed v4), `en` + `ur` locales, locale-as-first-path-segment, middleware locale detection, RTL via Tailwind logical properties.
7. **CI:** typecheck → lint → unit (Vitest) → e2e @critical (Playwright) → axe-core → Lighthouse → size-limit (tiered: 130 KB Tier A / 135 KB Tier B / 80 KB animation).
8. **Security:** CSP (no `unsafe-inline` script), HSTS, X-Frame-Options DENY, etc. in `next.config.ts`; rate limiting deferred to Phase 2 (Upstash).
9. **Env:** `.env.example` is the contract; `lib/env.ts` (Zod validation) to be written in Phase 1.
10. **Workflow:** trunk-based, Conventional Commits, PR template, ADR discipline active.

Phase 1 exit gate: *staging loads homepage placeholder with correct fonts + colors; all 27 routes return placeholders without errors; CI green on every PR; preview deploy per PR.*
