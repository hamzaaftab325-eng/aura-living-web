# ADR-0001 — Phase 0 Locked Decisions

**Date:** 2026-06
**Status:** Accepted
**Decider:** Aura Living build lead (Phase 0 pre-flight)
**Supersedes:** —
**Superseded by:** —

---

## Context

Phase 0 of the Aura Living execution plan requires that a set of foundational decisions be **locked before any code is written**, so that the build does not stall mid-phase on a re-litigated choice. The architecture plan (v1.1, Ch 1.4) declares four non-negotiables and the execution plan (Phase 0) adds a budget reconciliation whose outcome must be recorded as a signed-off decision per Ch 15.1 (*“If a budget breaks: decide trade-off now … and record the decision”*).

Specifically, the following were open as of the start of Phase 0:

1. **Brand identity finality** — the name “Aura Living”, its tagline, and its positioning must be fixed across the repo, design tokens, metadata, and copy so that no mid-build rename cascades through 27 routes (Ch 1.2).
2. **Design-token sovereignty** — the four-tier token system (primitive → semantic → component → state) in `globals.css` must be the single source of truth, with no inline styles or magic numbers in components (Ch 5, App. A). This is a discipline decision, not a technology one.
3. **The four non-negotiables** — App Router (not Pages), RSC-by-default (Client Components only at interactive leaves), COD-first checkout, WCAG 2.2 AA (Ch 1.4).
4. **The 130 KB First Load JS budget** — the v1.1 additions of `next-intl` and `@tanstack/react-query` are first-paint costs that the original v1.0 budget did not allocate. The reconciliation (`docs/phase-0/budget-reconciliation.md`) found a +5 KB overage on data/shop routes. This overage must be explicitly accepted or rejected before Phase 1.
5. **The 80 KB animation budget** — re-checked against GSAP + ScrollTrigger + @gsap/react + Motion + Lenis; holds at exactly 80 KB with zero headroom. The zero-headroom condition is itself a decision (it forecloses adding any future animation library without removing one).
6. **Animation library install sequencing** — `gsap`, `@gsap/react`, and `lenis` are not needed until Phase 3. Installing them in Phase 1 risks accidental first-paint import that would silently bust the budget. The sequencing is a budget-protection decision.

Doing nothing is not an option: Phase 1 (Foundation) cannot begin until these are settled, because Phase 1 wires the token system, the folder structure, the CI budget checks, and the `next-intl` middleware — all of which depend on these decisions.

---

## Decision

The following six decisions are **locked** as of Phase 0 and may not be changed without a superseding ADR:

### D1 — Brand identity is final

- **Brand name:** Aura Living (derived from Latin *aureus*, “golden”).
- **Tagline:** “Light, life, and living beauty — for the home you are becoming.”
- **Positioning:** First Pakistani-owned, premium-curated home-decor brand online.
- **Niche:** Three categories only — artisanal lamps, living plants, hand-poured candles. Furniture, bedsheets, and large textiles are explicitly excluded.
- **Application:** The string “Aura Living” is used verbatim across the repo name, `package.json` `name` field (pending rename in Phase 1), `<title>` patterns, OG defaults, JSON-LD `Organization.name`, the footer copyright line, and all customer-facing copy. No abbreviations (“Aura”, “AL”) in customer-facing surfaces.

### D2 — Design tokens are the single source of truth

- The four-tier token system (primitive → semantic → component → state) defined in `globals.css` is the **only** legitimate source of color, spacing, radius, elevation, z-index, breakpoint, and motion values.
- **No inline styles** anywhere (enforced by ESLint rule `react/no-inline-styles`).
- **No magic numbers** in components — every value resolves to a token (enforced by ESLint rule banning arbitrary Tailwind values `[...]`).
- **Primitive tokens are never used directly in components** — only semantic and above. (e.g., a component uses `bg-background`, never `bg-ink-950`.)
- Gold-on-light **always** uses `gold.700 (#8A6B26)` — never `gold.500 (#C9A84C)`, which fails WCAG AA at 2.1:1. This is enforced by a custom ESLint rule to be written in Phase 1.
- The token files (`globals.css`, `tailwind.config.ts`) are owned by the design-system maintainer; component authors consume, never override.

### D3 — The four non-negotiables (Ch 1.4)

1. **App Router only.** Pages Router is deprecated and will not be used. All 27 routes are App Router route segments.
2. **RSC by default.** Components are Server Components unless they need `useState`/`useEffect`/`useRef`, event handlers, browser APIs, or client-only hooks (`useGSAP`, `useLenis`). Client Components are marked `'use client'` and live at the interactive leaves of the tree. The header, footer, breadcrumbs, product titles, descriptions, and most marketing content are Server Components.
3. **COD-first checkout.** Cash-on-Delivery is the default-selected payment method, listed first in the payment radio group, with reassuring (not cautionary) copy. COD requires OTP verification via SMS to a `+92` number. This is non-negotiable because 70–85% of Pakistani e-commerce is COD.
4. **WCAG 2.2 AA.** Every component, page, and interaction targets WCAG 2.2 Level AA conformance, including the 9 new 2.2 criteria (focus appearance, target size minimum, accessible authentication, etc.). axe-core zero violations is a blocking CI check.

### D4 — Bundle budgets (reconciled in Phase 0)

- **Animation budget: 80 KB gzipped** (GSAP core 30 + ScrollTrigger 12 + @gsap/react 2 + Motion 30 + Lenis 6). Zero headroom. Adding any future animation library requires removing one of equal-or-greater size, recorded in a new ADR.
- **First Load JS — Tier A (marketing/static routes): 130 KB** ceiling. Covers `/`, `/about`, `/contact`, `/faq`, `/journal`, `/lookbook`, all legal pages, `/404`, `/maintenance`, `/offline`, `/accessibility-statement`.
- **First Load JS — Tier B (data/shop routes): 135 KB** ceiling — a **+5 KB documented carve-out** above the v1.0 130 KB target, to absorb `@tanstack/react-query` (13 KB) which is mandatory for the Ch 21 mock→Supabase service swap. Covers `/shop`, `/shop/[category]`, `/product/[slug]`, `/collections/[slug]`, `/search`, `/cart`, `/checkout`, `/orders/[id]/confirmed`, `/account/*`.
- **Mobile page weight: 800 KB** (Phase 4 enforcement, unchanged from plan).
- Both budgets are enforced in CI via `size-limit` with per-route globs (config finalised in Phase 1; the **limits** are locked here). Raising either limit requires a superseding ADR.

### D5 — Animation library install sequencing

- `gsap`, `@gsap/react`, and `lenis` are **not installed in Phase 1**. They are installed in **Phase 3 (Polish & Animations)**, the phase in which they are first used.
- `framer-motion` (already installed as `^12`) is permitted for Phase 2 only in its lightest forms (the `Reveal` wrapper, `AnimatePresence` for the cart drawer) — **not** for any scroll-scrubbed or pinned animation, which requires GSAP and therefore waits for Phase 3.
- Rationale: installing GSAP/Lenis early invites an accidental top-level import that ships 44 KB to the client on every route, busting the 130 KB budget silently. The sequencing makes the budget physically unbreakable during Phase 1–2.

### D6 — ADR discipline begins now

- This ADR (`0001`) is the first. The ADR process (`docs/adr/README.md`) is in force from Phase 0 onward.
- Any deviation from D1–D5 in any later phase requires a superseding ADR written **before** the deviating code is merged.
- The roadmap (5 phases, 9 weeks) is frozen. New features discovered mid-build are deferred to v2 and recorded as anticipated ADRs, not folded into the current build (Ch 15.3).

---

## Rationale

### Why lock the brand identity now (D1)
A rename after Phase 1 would require editing the token comments, every `<title>`, every JSON-LD block, the OG default image, the footer, the `package.json`, and the README — plus invalidating any marketing screenshots already captured. Locking it in Phase 0 costs nothing; deferring it risks a multi-hour find-and-replace that touches every feature folder.

### Why token sovereignty (D2)
The architecture plan’s entire accessibility argument (Ch 11.4) depends on the gold.700-on-light rule. If component authors can inline `color: #C9A84C`, the contrast guarantee silently breaks. The token system is the enforcement mechanism; without sovereignty, it is decoration.

### Why the four non-negotiables are non-negotiable (D3)
- App Router: Pages Router is deprecated in Next 16; building on it would be technical debt on day one.
- RSC-by-default: the 130 KB budget is only achievable if most components ship zero JS. Flipping the default to Client would double the bundle.
- COD-first: this is a market constraint, not a preference. 70–85% of Pakistani e-commerce is COD; a card-first checkout would abandon the majority of customers.
- WCAG 2.2 AA: the European Accessibility Act is in full force April 2026, and the plan’s brand promise of “premium” includes accessibility as table stakes.

### Why the +5 KB Tier B carve-out instead of raising the flat budget (D4)
Considered alternatives:
- **(a) Raise the flat budget to 145 KB for all routes.** Rejected — it would mask inefficiencies on marketing routes where React Query is unnecessary, and it weakens the budget as a signal.
- **(b) Defer `next-intl` to Phase 4.** Rejected — the locale middleware and `dir="rtl"` plumbing must exist from Phase 1 to avoid a costly retrofit of every component to logical properties (`ps-`, `pe-`, `ms-`, `me-`) later. The plan (Ch 18) is explicit that i18n is foundational.
- **(c) Defer `@tanstack/react-query` and hand-roll a cache.** Rejected — the senior-dev review (Ch 21) explicitly chose RQ over SWR for its richer mutation model and prefetch API; reverting would discard that decision and produce a worse, non-standard cache.
- **(d) Tiered budget (chosen).** 130 KB for Tier A (the bulk of organic-traffic routes), 135 KB for Tier B where RQ is essential. Preserves the signal on marketing routes, accepts the irreducible cost on data routes, keeps 14 KB combined headroom (6 + 8). Enforced per-route in CI.

### Why zero animation headroom is acceptable (D4)
The 80 KB animation budget is the sum of five libraries each doing a job no other library can replace: GSAP (scroll-scrubbed timelines), ScrollTrigger (pinning), @gsap/react (SSR-safe `useGSAP`), Motion (component enter/exit + gestures), Lenis (smooth scroll). Removing any one breaks a documented motion pattern. The mitigation is that GSAP/ScrollTrigger (44 KB of the 80) is desktop-only and dynamically imported, so on mobile — the most budget-constrained devices — the effective first-paint animation cost is ~36 KB, leaving implicit headroom where it matters most.

### Why defer GSAP/Lenis install to Phase 3 (D5)
Considered alternatives:
- **(a) Install everything in Phase 1.** Rejected — an accidental `import { gsap } from 'gsap'` in a shared utility would ship 44 KB to every route silently. The ESLint rule banning it would not exist yet (it is written against the actual import graph).
- **(b) Install in Phase 1 with a strict ESLint no-import rule.** Rejected — fragile; the rule would need maintaining and could be bypassed.
- **(c) Defer install to Phase 3 (chosen).** The libraries physically cannot be imported before they exist. The Phase 2 build uses only Framer Motion’s lightest APIs, which are already installed. Budget is unbreakable by construction.

### Why ADR discipline begins now (D6)
The plan (Ch 28.3) mandates ADRs. Starting the discipline in Phase 0 means the first decision (this one) is recorded before any code exists, establishing the pattern. Deferring ADRs to “when we need them” invariably means they are never written.

---

## Consequences

### Positive

- **Phase 1 can proceed without decision stalls.** Every foundational question is answered; the scaffold PR can be reviewed against D1–D6 directly.
- **Budgets are physically enforced.** The tiered `size-limit` config (to be wired in Phase 1) makes a budget breach a CI failure, not a code-review debate.
- **Accessibility is a property of the system, not a review step.** The gold.700 rule, token sovereignty, and the axe-core gate make AA conformance the default path of least resistance.
- **Future contributors inherit the “why”.** ADR-0001 + the ADR README mean the reasoning behind every locked decision is one click away from the code that enforces it.

### Negative

- **Tier B routes carry a 5 KB penalty forever** (or until a superseding ADR). This is the cost of React Query. Accepted because the alternative (hand-rolled cache) is worse.
- **Zero animation headroom means any future motion feature must trade off.** If a future phase wants, e.g., a 3D product viewer (Three.js ≈ 150 KB), it cannot fit and must be deferred to v2 or loaded as a separate route-level chunk outside the budget. This is by design — the plan’s motion language is deliberately restrained.
- **No GSAP in Phase 2 means the Phase 2 build is visually plain.** The execution plan accepts this explicitly: *“A working, plain purchase flow beats a beautiful broken one.”* The Phase 2 exit criterion (Lighthouse 70+) is achievable without GSAP; the Phase 3 exit criterion (premium feel) requires it.
- **ADR maintenance overhead.** Every future architectural deviation requires writing an ADR before merging code. This is a small but real tax on velocity, accepted as the price of a 9-week build not collapsing under accumulated technical debt.

### Follow-up work implied

- **Phase 1:** wire `size-limit` with the tiered config; write the custom ESLint rule banning `gold.500`-on-light and arbitrary Tailwind values; rename `package.json` `name` to `aura-living`; write ADR-0002 if any Tier B route actually exceeds 135 KB in measurement (the +5 KB is a ceiling, not a prediction).
- **Phase 2:** write ADR-0003 (mock service interface contract) when the first `services/[domain]/` folder is created.
- **Phase 3:** write ADR-0004 (GSAP desktop-only lazy import strategy) when the `Parallax` wrapper is built.

---

## Status

**Accepted** — 2026-06. Phase 0 pre-flight complete. Phase 1 (Foundation) is unblocked.

This ADR is immutable from this point forward. Any change to D1–D6 requires a new ADR numbered sequentially (0002, 0003, …) that supersedes the relevant decision, with this ADR’s `Status` line updated to `Superseded by ADR-NNNN` and the new ADR cross-referenced here.
