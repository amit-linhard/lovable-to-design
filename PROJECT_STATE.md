# Project State

> **This is the first file the agent reads at the start of every session.**
> It provides the current state of the project so the agent can resume work without re-reading everything.

**Project:** Design Contract Hub
**Last Updated:** 2026-02-21 (Session 2)
**Updated By:** Claude Code

---

## Track

**Track:** Build Track

### Milestone Input Files

| Input | Location |
|-------|----------|
| Milestone List | `docs/MILESTONE_LIST.md` |

---

## Current Position

**Active Iteration:** 2
**Active Milestone:** M2 — Canonical Preview Components
**Active Task:** T0 ☑ Complete — ⏸ awaiting human review of skeleton before T1
**Branch:** `dev-i2`
**Milestone Status:** In Progress (T0 done; T1–T3 not started)
**Task Status:** T0 ☑ Complete

---

## Last Completed Work

**M2 T0 Skeleton — Session 3** (2026-02-21)

M2 Task 0: Created `src/components/preview/` with 7 files — 5 component stubs, 1 composite, 1 barrel.

Files created:
- `src/components/preview/PreviewButton.tsx` — stub (primary + ghost variant props)
- `src/components/preview/PreviewCard.tsx` — stub
- `src/components/preview/PreviewInput.tsx` — stub
- `src/components/preview/PreviewNav.tsx` — stub
- `src/components/preview/PaletteStrip.tsx` — stub (colors + size props)
- `src/components/preview/ComponentPreview.tsx` — composite; wires colorOverride into effectiveColors
- `src/components/preview/index.ts` — barrel re-exports all 6 components + their prop types

Verification: `npm run typecheck` → clean; `npm test` → 25/25 pass

---

## Project Tree (Current)

```
project-root/
├── src/
│   ├── contracts/
│   │   ├── types.ts            ← M1 T1: DesignContract, ColorTokens, ElevationTokens, etc.
│   │   ├── spacing.ts          ← M1 T2: 4px scale, defaultComponentBinding
│   │   ├── themes.ts           ← M1 T3: 4 themes with full tokens incl. elevation
│   │   └── contracts.test.ts   ← 25 tests (24 in this file + 1 in lovable-export) — all passing
│   ├── components/
│   │   └── preview/            ← M2 T0: component stubs
│   │       ├── PreviewButton.tsx
│   │       ├── PreviewCard.tsx
│   │       ├── PreviewInput.tsx
│   │       ├── PreviewNav.tsx
│   │       ├── PaletteStrip.tsx
│   │       ├── ComponentPreview.tsx
│   │       └── index.ts
│   ├── App.tsx                 ← M1 T0: minimal app shell
│   └── main.tsx                ← M1 T0: React entry point
├── docs/
│   ├── MILESTONE_LIST.md
│   └── milestones/
│       ├── milestone-1.md      ← In progress (Skeleton Review gate)
│       ├── milestone-2.md      ← Not Started
│       ├── milestone-3.md      ← Not Started
│       ├── milestone-4.md      ← Not Started
│       └── milestone-5.md      ← Not Started
├── Project-Skeleton/           ← GRB framework reference (read-only)
├── index.html                  ← M1 T0
├── package.json                ← M1 T0
├── tsconfig.json               ← M1 T0
├── tsconfig.node.json          ← M1 T0
├── vite.config.ts              ← M1 T0
├── .env.example
├── .gitignore
├── CONVENTIONS.md              ← M1 T0
├── PROJECT_STATE.md            ← M1 T0 (this file)
└── CHANGELOG_BUILDING.md       ← M1 T0
```

---

## Milestone Progress

| Milestone | Name | Status | Branch | Tasks Done / Total |
| --- | --- | --- | --- | --- |
| M1 | Foundation & Data Model | ☑ Complete | `dev-i1` | 4/4 (awaiting merge gate) |
| M2 | Canonical Preview Components | In Progress | `dev-i2` | 1/4 |
| M3 | Theme Library & Browse Screen | Not Started | `dev-i3` | 0/4 |
| M4 | Preview Flow & Optional Brand Color | Not Started | `dev-i4` | 0/4 |
| M5 | Output Format & Export | Not Started | `dev-i5` | 0/4 |

---

## Deviations from Plan

| Date | Milestone | Task | What Changed | Why |
| --- | --- | --- | --- | --- |
| 2026-02-21 | M1 | All | Contracts (T1–T3) committed to `main` before `dev-i1` branch existed | Project initialized before branch workflow established; dev-i1 created retroactively |
| 2026-02-21 | M1 | T1 | `ColorTokens` uses `textPrimary`, `textSecondary`, `focusRing` instead of `muted`/`success`/`warning`/`error` from M1 spec | More practical for component styling; deferred semantic state tokens have no impact on M2–M5 |
| 2026-02-21 | M1 | T1 | `ShapeTokens` uses numeric `radiusSm/Md/Lg` instead of `sharp \| soft \| pill` union | Numeric values apply directly to CSS; union aliases added no value |
| 2026-02-21 | M3 | T1 | Full theme token data already in `themes.ts` (normally M3 T1 scope) | Done upfront; M3 T1 is pre-complete — verify and mark at M3 start |
| 2026-02-21 | M1 | Session 2 | `ElevationTokens` interface + `elevation` field added to `DesignContract` after Session 2 extraction | Gap identified: FineTune + Export screens require elevation; not in original M1 spec; added as new OC-5 |

---

## Known Issues (Carried Forward)

| # | Issue | Discovered In | Impact | Status |
| --- | --- | --- | --- | --- |
| — | No known issues | — | — | — |

---

## Blocked Tasks

| Task | Milestone | Blocked By | Attempts | Last Error | Date |
| --- | --- | --- | --- | --- | --- |
| — | — | No blocked tasks | — | — | — |

---

## Agent Session Log

| Session # | Date | Started At | Ended At | Work Done | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026-02-21 | M1 T0 (first session) | ⏸ M1 T0 skeleton gate | Initialized project scaffold, ran tests, updated all docs | Branch: dev-i1; 24/24 tests pass |
| 2 | 2026-02-21 | Session 2: Build Contract Extraction | ☑ M1 verified + ready for merge | Session 2 extraction (4 objectives): schemas, state, screen specs, milestone alignment. Added ElevationTokens. Updated M1–M5 milestones + CHANGELOG. Ran tests + typecheck. | 25/25 tests pass; typecheck clean; M1 ready for merge gate |
| 3 | 2026-02-21 | M2 T0 skeleton | ⏸ T0 skeleton gate | Created src/components/preview/ with 7 files (5 stubs + ComponentPreview + barrel). Typecheck clean; 25/25 pass. | Branch: dev-i2 |

---

## Quick Resume Instructions

For the agent starting a new session:

1. Read this file completely
2. Read `CONVENTIONS.md`
3. Read `CHANGELOG_BUILDING.md` — entries 1–9 all affect downstream work
4. Open `docs/milestones/milestone-1.md`

**M2 T0 is at the skeleton review gate.**
- Human reviews `src/components/preview/` stubs.
- On approval: proceed to T1 (Button & Card + PaletteStrip).

**To resume T1:**
Open `docs/milestones/milestone-2.md` → Task 1.
Key reminders: PreviewCard uses `contract.elevation.sm`; PaletteStrip renders all 9 ColorTokens keys; colorOverride merges into effectiveColors (never mutate contract).
