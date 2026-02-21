# Milestone 2: Canonical Preview Components

**Branch:** `dev-i2`
**Status:** Not Started
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Milestone Objective

**Primary Goal:** Build the four canonical preview components (Button, Card, Input, Nav) that render from a Design Contract so browse and preview screens can show real component previews.

**Why Now:** M1 provides types; M3 needs thumbnails and M4 needs full preview — both depend on these components.

**Success Definition:** All four components render correctly when given a contract; Button (primary + ghost), Card, Input (border/focus), Nav (spacing, active state).

---

## Scope & Boundaries

### In Scope
- PreviewButton (primary + ghost variants)
- PreviewCard (surface, elevation, padding, label/value hierarchy)
- PreviewInput (border, radius, focus state)
- PreviewNav (background, item spacing, active state)
- All accept DesignContract (or slice) and apply tokens

### Explicitly Out of Scope
- Browse grid or theme cards (M3)
- Full preview screen or export (M4, M5)
- Framework output generation

---

## Was It Updated?

| Source | What Changed | Impact on This Milestone | Date |
| --- | --- | --- | --- |
| — | No changes | — | — |

---

## Preconditions (Input Contract)

| # | Requirement | Provided By | How to Verify | Status |
| --- | --- | --- | --- | --- |
| PC-1 | DesignContract and token types importable | M1, OC-1 | Import from types module; compile | ☐ Not Checked |
| PC-2 | Spacing scale and component bindings exist | M1, OC-3 | Scale and bindings exported | ☐ Not Checked |
| PC-3 | Theme data structure available | M1, OC-4 | Theme module exists with correct shape | ☐ Not Checked |

---

## Postconditions (Output Contract)

| # | What Will Exist | Consumed By | How to Verify |
| --- | --- | --- | --- |
| OC-1 | PreviewButton, PreviewCard, PreviewInput, PreviewNav exportable | M3, M4 | Components render with a sample contract |
| OC-2 | All four apply contract tokens (color, typography, shape, spacing) | M3, M4 | Visual check; no hardcoded design in components |

---

## Technical Approach

### Key Decisions
| Decision | Choice Made | Why |
| --- | --- | --- |
| Contract prop | Components accept DesignContract (or theme slice) | Single source of truth per preview |
| Styling | CSS variables or inline theme from contract | One contract drives all four |

### System Areas Affected
**New Modules Created:** Preview component files (e.g. `src/components/preview/Button.tsx`, Card, Input, Nav)

---

## Tasks Overview

| Task # | Name | Status |
| --- | --- | --- |
| 0 | Create Milestone Skeleton | ☐ Not Started |
| 1 | Button & Card | ☐ Not Started |
| 2 | Input & Nav | ☐ Not Started |
| 3 | Token application | ☐ Not Started |

---

## Task 0: Create Milestone Skeleton

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Scaffold the four component files and a minimal page or story that renders all four with a stub contract.

### What to Produce
- Four component files with correct props (contract) and empty or placeholder JSX
- One page or story that imports all four and a stub DesignContract
- No full styling yet — signatures and structure only

### Success Criteria
- Files exist; project compiles; placeholders render without error

### After Success
Commit: `chore(milestone-2): scaffold skeleton — preview component stubs`
**⏸ PAUSE — Human reviews skeleton.**

---

## Task 1: Button & Card

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Implement PreviewButton (primary + ghost) and PreviewCard per PRD. They must read color, typography, shape, spacing from contract.

### Preconditions
| # | Requirement | How to Verify |
| --- | --- | --- |
| TP-1 | Task 0 complete; M1 types available | Imports work |

### What to Build
- **PreviewButton:** primary and ghost variants; fill, radius, type weight from contract
- **PreviewCard:** surface color, elevation, padding from scale; label/value hierarchy
Apply contract tokens; no hardcoded colors or spacing.

### Success Criteria
- Both components render with at least one sample contract; variants switch correctly
- Visual check: colors and spacing come from contract

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 2: Input & Nav

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Implement PreviewInput (border, radius, focus) and PreviewNav (background, item spacing, active state) per PRD.

### Preconditions
| TP-1 | Task 0 and 1 complete | Button and Card exist |

### What to Build
- **PreviewInput:** border style, radius, focus state from contract
- **PreviewNav:** background, item spacing, active state treatment from contract
Apply contract tokens consistently.

### Success Criteria
- Input and Nav render with sample contract; focus and active state visible
- No hardcoded design

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 3: Token Application

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Ensure all four components use color, typography, shape, and spacing exclusively from the contract. Remove any leftover hardcoded values.

### Preconditions
| TP-1 | Tasks 1 and 2 complete | All four components implemented |

### What to Build
- Audit and refactor: every visual token (color, font, radius, spacing) must come from the contract prop
- Document or test that changing contract changes appearance

### Success Criteria
- [ ] Changing contract updates all four components
- [ ] No hardcoded colors, fonts, or spacing in preview components

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Failure Protocol

Same as M1: task failure after 3 attempts → STOP and log; dependency broken → STOP and flag; scope expansion → STOP and propose split.

---

## Milestone Completion Checklist

- [ ] All tasks committed
- [ ] Preconditions PC-1–PC-3 verified at start
- [ ] Postconditions: all four components exportable and contract-driven
- [ ] E2E or manual: render all four with two different contracts; appearance differs
- [ ] No uncommitted changes; PROJECT_STATE updated

**⏸ PAUSE — Human reviews before merge.**

---

## Milestone Verification Log

| Check | Result | Notes |
| --- | --- | --- |
| All tasks committed | ☐ Pass / ☐ Fail | |
| Preconditions verified | ☐ Pass / ☐ Fail | |
| Postconditions verified | ☐ Pass / ☐ Fail | |
| Components contract-driven | ☐ Pass / ☐ Fail | |

**Verification result:** ☐ PASS | ☐ FAIL
**Verified by:** ________________ on ________________
