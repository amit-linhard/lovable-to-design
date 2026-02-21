# Milestone 1: Foundation & Data Model

**Branch:** `dev-i1`
**Status:** Complete
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Milestone Objective

**Primary Goal:** Establish project structure, data schemas for design contracts, and the 4px spacing scale so all downstream work has a single source of truth for tokens and theme shape.

**Why Now:** First milestone; no UI or themes can be built without types and spacing scale.

**Success Definition:** Types/schemas exist and parse; theme data structure is defined; no UI yet.

---

## Scope & Boundaries

### In Scope
- DesignContract and nested token types (ColorTokens, TypographyTokens, ShapeTokens, SpacingScale, ComponentBinding)
- ElevationTokens (sm/md/lg box-shadow scale) — confirmed required by Session 2 extraction (FineTune locked-token panel + Export renderers)
- ExportConfig type (output format: tailwind | css-vars | shadcn)
- 4px base spacing scale and named steps
- Theme data module with structure for four themes (stub or minimal content)

### Explicitly Out of Scope
- Any UI or screens
- Full theme content (can be stubbed; full content in M3)
- Framework output or export logic
- Configurable base unit (4px only in v1)

---

## Was It Updated?

| Source | What Changed | Impact on This Milestone | Date |
| --- | --- | --- | --- |
| Session 2 extraction | Added `ElevationTokens` interface + `elevation` field to `DesignContract`; added elevation values to all 4 theme stubs | New OC-5; tests extended; no breaking changes to OC-1–OC-4 | 2026-02-21 |

---

## Preconditions (Input Contract)

| # | Requirement | Provided By | How to Verify | Status |
| --- | --- | --- | --- | --- |
| PC-1 | None — first milestone | — | N/A | ☑ N/A |

---

## Postconditions (Output Contract)

| # | What Will Exist | Consumed By | How to Verify |
| --- | --- | --- | --- |
| OC-1 | DesignContract and token types defined and importable | M2, M3, M5 | Import from schema module; TypeScript compiles |
| OC-2 | ExportConfig type (tailwind \| css-vars \| shadcn) | M5 | Type present and used in type exports |
| OC-3 | 4px spacing scale constants and named steps | M2, M3 | Scale exported; component binding map (sm/md/lg) defined |
| OC-4 | Theme data structure (file/module) ready for four themes | M3 | Theme array or map with correct shape; can add entries |
| OC-5 | ElevationTokens interface + `elevation` field on DesignContract; all 4 themes have elevation values | M4, M5 | `t.elevation.sm/md/lg` are non-empty strings; tests pass |

---

## Technical Approach

### Key Decisions

| Decision | Choice Made | Why |
| --- | --- | --- |
| Schema format | TypeScript types/interfaces | App is TS/React; type-safe theme consumption |
| Theme data location | In-code (JSON/TS objects) | v1 no CMS; curated themes ship with app |
| Spacing | 4px base only | PRD scope; configurable base deferred |

### System Areas Affected

**New Modules Created:**
- `src/types/design-contract.ts` (or equivalent)
- `src/data/themes.ts` or `src/theme-data.ts` (structure only)
- Spacing scale in types or constants module

### Dependencies & Unlocks

**Depends On:** None
**Unlocks:** M2 (components need types), M3 (themes need structure), M5 (export needs ExportConfig)

---

## Tasks Overview

This milestone consists of **4 tasks** (Task 0 + 3 implementation tasks).

| Task # | Name | Status |
| --- | --- | --- |
| 0 | Create Milestone Skeleton | ☑ Complete (skeleton approved; Session 2 triggered elevation addition) |
| 1 | Design contract types | ☑ Complete |
| 2 | Spacing scale | ☑ Complete |
| 3 | Theme data shape | ☑ Complete |

---

## Task 0: Create Milestone Skeleton

**Status:** ☑ Complete — skeleton approved; elevation addition completed in Session 2 verification
**Attempt:** 1 of 3

### Context
Mandatory first task. Create file stubs and type signatures only — no implementation.

### What to Produce
- `src/types/design-contract.ts` (or equivalent) with exported type names and empty/stub interfaces
- `src/data/themes.ts` or similar with empty array or stub theme shape
- Spacing scale file with constant names and placeholder values
- Project tree in PROJECT_STATE.md updated if that file exists

### Success Criteria
- All listed files exist; TypeScript parses without errors
- No logic or full type bodies required at this step

### After Success
```bash
git add [files]
git commit -m "chore(milestone-1): scaffold skeleton — types and theme data stubs"
git push origin dev-i1
```
**⏸ PAUSE — Human reviews the skeleton before proceeding to Task 1.**

---

## Task 1: Design Contract Types

**Status:** ☑ Complete
**Attempt:** 1 of 3

### Context
Define the core schema so every milestone can depend on a single contract shape. PRD Section 4 defines: color, typography, shape, spacing, component bindings.

### Critical Constraints
- Match PRD: primary, accent, surface, background, border, muted + semantic (success, warning, error) for color
- Typography: display font, body font, type scale (sm/base/lg/xl/2xl), weight rules
- Shape: border-radius (sharp/soft/pill), elevation (flat/shadow/border), density (compact/comfortable/spacious)
- ExportConfig: tailwind | css-vars | shadcn

### Preconditions (Task-Level)
| # | Requirement | How to Verify |
| --- | --- | --- |
| TP-1 | Task 0 complete; type file exists | File present; compiles |

### What to Build

**Component: Type definitions**

- `ColorTokens`: primary, accent, surface, background, border, muted, success?, warning?, error?
- `TypographyTokens`: displayFont, bodyFont, scale (sm/base/lg/xl/2xl), weightUsage
- `ShapeTokens`: borderRadius (sharp | soft | pill), elevation (flat | shadow | border), density (compact | comfortable | spacious)
- `SpacingScale`: baseUnit (4), steps (named), componentPaddingGapRules
- `ComponentBinding`: mapping of scale steps to sm/md/lg for button, card, input, nav
- `DesignContract`: color, typography, shape, spacing, componentBindings
- `ExportConfig`: { format: 'tailwind' | 'css-vars' | 'shadcn' }

Export all from the types module.

### Success Criteria
- All types compile; no `any` for contract fields
- DesignContract is a single aggregate type that includes the above

### After Success
Commit with message referencing milestone-1 and task 1. Update Tasks Overview and PROJECT_STATE.md if present.

### If This Task Fails
After 3 attempts: STOP; log in PROJECT_STATE.md; flag for human review.

---

## Task 2: Spacing Scale

**Status:** ☑ Complete
**Attempt:** 1 of 3

### Context
PRD locks 4px base in v1. Named scale steps and component bindings (sm/md/lg) must be defined so components and themes can reference them.

### Preconditions (Task-Level)
| # | Requirement | How to Verify |
| --- | --- | --- |
| TP-1 | Task 1 complete; DesignContract and SpacingScale type exist | Types importable |

### What to Build
- 4px base scale: define named steps (e.g. 0, 1, 2, 3, 4, 5, 6…) in px or rem derived from 4px
- ComponentBinding: which scale steps map to button/card/input/nav sm, md, lg (can be constants or part of default contract)
- Export scale and binding so M2/M3 can use them

### Success Criteria
- Scale steps are consistent (4px base); bindings are typed and exportable
- No configurable base unit (4px only)

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 3: Theme Data Shape

**Status:** ☑ Complete
**Attempt:** 1 of 3

### Context
M3 will add full content for four themes. This task ensures the data module and shape exist so themes can be added without changing contract type.

### Preconditions (Task-Level)
| # | Requirement | How to Verify |
| --- | --- | --- |
| TP-1 | Task 1 and 2 complete | Types and scale exist |

### What to Build
- Theme data module: array or record of DesignContract (or theme metadata + contract)
- Structure for four entries: Clean Pro, Warm Editorial, Dense Data, Soft Product (can be stubs with names only, or minimal tokens)
- Export so M3 can import and fill in full token values

### Success Criteria
- Theme list loadable; each entry conforms to DesignContract shape
- M3 can add/edit theme content without changing this milestone’s types

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Failure Protocol

- **Task fails after 3 attempts:** STOP task; log in PROJECT_STATE.md; do not proceed to dependent tasks.
- **Dependency broken:** STOP; log; flag for human review.
- **Scope expansion:** If task needs >2x expected effort, STOP; log; propose split; wait for approval.

---

## Milestone Completion Checklist

- [x] All tasks marked complete and committed (T0 skeleton approved; T1–T3 complete; elevation added in verification)
- [x] Preconditions verified (N/A for M1)
- [x] Postconditions: OC-1–OC-5 verifiable (imports, types, scale, theme structure, elevation)
- [x] No uncommitted changes
- [x] PROJECT_STATE.md updated

**⏸ PAUSE — Human reviews before merge.**

### Merge to Dev
```bash
git checkout dev-i1
git status
git push origin dev-i1
git checkout dev
git pull origin dev
git merge dev-i1
git push origin dev
```

---

## Milestone Verification Log

| Check | Result | Notes |
| --- | --- | --- |
| All tasks committed | ☑ Pass | T0 skeleton approved; elevation gap addressed in Session 2 |
| Postconditions verified | ☑ Pass | OC-1–OC-5 all pass |
| Clean git status | ☑ Pass | All changes committed |
| PROJECT_STATE updated | ☑ Pass | Updated 2026-02-21 |
| 25 tests passing | ☑ Pass | 24 in contracts.test.ts (elevation assertions added to existing theme tests) + 1 in lovable-export |

**Verification result:** ☑ PASS
**Verified by:** Claude Code (Session 2) on 2026-02-21
