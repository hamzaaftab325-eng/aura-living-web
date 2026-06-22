# Architecture Decision Records (ADR)

**Source:** Aura Living Frontend Architecture Plan v1.1 — Ch 28.3
**Location:** `/docs/adr/`

---

## What an ADR is

An ADR is a short, immutable text document that records **one** significant architectural decision: the context that forced it, the decision made, why it was chosen over alternatives, what consequences follow, and its current status. ADRs exist so that future contributors (including future-us) understand *why* the codebase looks the way it does, not just *what* it looks like.

---

## When to write an ADR

Write an ADR when a decision is:

- **Hard to reverse** — changing it later would touch many files, break contracts, or require data migration.
- **Cross-cutting** — it affects more than one feature folder or more than one phase of the roadmap.
- **Forced by a constraint** — a budget, a deadline, a dependency, or a senior-dev review point that narrowed the options.
- **Contested** — reasonable engineers could disagree; the ADR records why we landed where we did.

Do **not** write an ADR for: choice of a single utility function, naming of a local variable, or anything fully reversible in under an hour. Those belong in code comments or PR descriptions.

---

## ADR format (5 sections, mandatory)

Every ADR in this folder follows exactly this structure:

```markdown
# ADR-NNNN — <short title>

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded by ADR-XXXX | Deprecated
**Decider:** <role or body>
**Supersedes:** <ADR-XXXX or "—">
**Superseded by:** <ADR-XXXX or "—">

## Context
What is the problem? What constraints (technical, schedule, budget, market) force a decision now? What happens if we do nothing?

## Decision
What we decided. State it as a single declarative sentence first, then elaborate.

## Rationale
Why this option over the alternatives. Name the alternatives considered and why each was rejected. Reference plan chapters and budget numbers.

## Consequences
What becomes easier, what becomes harder, what new risks appear, what follow-up work is implied. Be honest about costs.

## Status
Current state of the decision. Update only this section after acceptance — the four sections above are immutable once Accepted.
```

---

## Rules

1. **Numbered sequentially** — `0001`, `0002`, … Zero-padded to four digits.
2. **Immutable after acceptance.** Once `Status: Accepted`, the Context/Decision/Rationale/Consequences sections are never edited. If a decision is reversed, write a **new** ADR that supersedes it and update only the `Status` and `Superseded by` lines of the old one.
3. **One decision per ADR.** If a decision has three sub-decisions, write three ADRs and cross-reference them.
4. **Plain text only.** No images, no embedded diagrams. Link out to design docs if needed.
5. **Committed with the code that enforces them.** An ADR about bundle budgets is committed in the same PR that wires `size-limit`.
6. **Referenced from PRs.** A PR that implements an ADR’s decision links to it in the description.

---

## Index

| # | Title | Status | Date |
|---|---|---|---|
| [0001](./0001-locked-decisions.md) | Phase 0 Locked Decisions (brand, tokens, non-negotiables, bundle budgets) | Accepted | 2026-06 |

<!-- Add new ADRs below this line. Keep the table sorted by number. -->

---

## ADRs anticipated by the roadmap

These will be written when the relevant phase begins. Listing them here so the work is not forgotten:

| Anticipated ADR | Phase | Trigger |
|---|---|---|
| ADR-0002 — Tier B +5 KB First Load JS carve-out (data/shop routes) | 1 | When `size-limit` config is wired and the first data-route exceeds 130 KB |
| ADR-0003 — Mock service interface contract (`services/[domain]/{types,mock,supabase,index}.ts`) | 2 | When the first service domain is implemented |
| ADR-0004 — GSAP desktop-only lazy import strategy | 3 | When the Parallax wrapper is built |
| ADR-0005 — Cookie-consent storage format & expiry | 4 | When the consent banner is built |
| ADR-0006 — FlexSearch → Algolia migration contract | 4/5 | When search index exceeds 500 SKUs |
| ADR-0007 — Supabase adoption for full-stack phase | (post-launch) | When the full-stack phase begins |
