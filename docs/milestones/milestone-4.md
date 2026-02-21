# Milestone 4: Preview Flow & Optional Brand Color

**Branch:** `dev-i4`
**Status:** Not Started
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Milestone Objective

**Primary Goal:** Full preview experience: selecting a theme shows all four canonical components in that theme; token values visible on hover; optional one brand color override within the selected theme.

**Why Now:** M2 and M3 deliver components and browse; this delivers “feel the theme before committing” and optional fine-tune.

**Success Definition:** User can open full preview for selected theme; see Button, Card, Input, Nav; hover to see token values; optionally swap one palette tone for brand color.

---

## Scope & Boundaries

### In Scope
- Full preview screen with all four components in selected theme
- Token values on hover (token name + value for key elements)
- Optional brand color override: one palette tone (e.g. accent); font and shape locked
- “Committed” theme (with optional override) available for M5 export

### Explicitly Out of Scope
- Output format selection or export (M5)
- Full palette customization (deferred)
- Multiple overrides

---

## Was It Updated?

| Source | What Changed | Impact on This Milestone | Date |
| --- | --- | --- | --- |
| — | No changes | — | — |

---

## Preconditions (Input Contract)

| # | Requirement | Provided By | How to Verify | Status |
| --- | --- | --- | --- | --- |
| PC-1 | Canonical preview components (M2) | M2, OC-1 | Components render with contract | ☐ Not Checked |
| PC-2 | Four themes and selected theme available (M3) | M3, OC-1, OC-3 | Browse works; selection readable | ☐ Not Checked |

---

## Postconditions (Output Contract)

| # | What Will Exist | Consumed By | How to Verify |
| --- | --- | --- | --- |
| OC-1 | Preview screen: all four components with selected theme | M5 | Navigate to preview; see themed components |
| OC-2 | Token values visible on hover for key elements | — | Hover over elements; see token name + value |
| OC-3 | Optional brand color override; applied to contract copy (no mutation of curated theme) | M5 | Set brand color; preview and export use overridden contract |
| OC-4 | “Committed” theme (with optional override) available for export | M5 | Export receives correct contract |

---

## Technical Approach

### Key Decisions
| Decision | Choice Made | Why |
| --- | --- | --- |
| Brand color | Apply to a copy of contract; never mutate curated theme | Principle: contracts over options; one override only |
| Token on hover | Tooltip or sidebar with token name + value | PRD: token values visible on hover |

### System Areas Affected
**New/Modified:** Preview page, token-tooltip or inspector, brand-color override UI, theme copy utility

---

## Tasks Overview

| Task # | Name | Status |
| --- | --- | --- |
| 0 | Create Milestone Skeleton | ☐ Not Started |
| 1 | Full preview screen | ☐ Not Started |
| 2 | Token values on hover | ☐ Not Started |
| 3 | Optional brand color override | ☐ Not Started |

---

## Task 0: Create Milestone Skeleton

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Scaffold preview screen and navigation from browse. No token hover or brand color yet.

### What to Produce
- Preview route/page that reads selected theme from state
- Placeholder layout for four components and (later) override UI
- Navigation from browse to preview (button or link)

### Success Criteria
- From browse, user can open preview; preview page loads with selected theme; components placeholder or wired

### After Success
Commit: `chore(milestone-4): scaffold skeleton — preview screen and navigation`
**⏸ PAUSE — Human reviews skeleton.**

---

## Task 1: Full Preview Screen

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Preview page must render all four canonical components at full size using the selected theme’s contract.

### Preconditions
| TP-1 | Task 0 complete; M2 components and M3 selection available | Preview route exists; selected theme in state |

### What to Build
- Preview screen: fetch or receive selected theme (DesignContract)
- Render PreviewButton (primary + ghost), PreviewCard, PreviewInput, PreviewNav with that contract
- Layout clear and readable (full size, not thumbnail)
- If no selection: redirect to browse or show message

### Success Criteria
- [ ] All four components render with selected theme
- [ ] Changing selection in browse and re-opening preview updates the preview
- [ ] No theme selected handled gracefully

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 2: Token Values on Hover

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
PRD: token values visible on hover. User should see which token (e.g. primary, border-radius) applies and its value.

### Preconditions
| TP-1 | Task 1 complete | Full preview screen works |

### What to Build
- On hover over relevant elements (e.g. button, card surface, input border, nav item): show token name and value (e.g. “primary: #0f172a”, “borderRadius: 0.5rem”)
- Implementation: tooltip, overlay, or sidebar; ensure it doesn’t block interaction
- Cover at least color, typography, shape, spacing where meaningful

### Success Criteria
- [ ] Hovering over key elements shows token info
- [ ] Values match the current contract
- [ ] UX is clear and non-intrusive

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 3: Optional Brand Color Override

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
PRD: within selected theme, user can swap one palette tone for a brand color. Font pairing and shape tokens stay locked.

### Preconditions
| TP-1 | Task 1 and 2 complete | Preview and token hover work |

### What to Build
- UI to set one “brand color” (e.g. color picker or hex input)
- Map brand color to one token (e.g. accent or primary) in a **copy** of the selected theme’s contract
- Preview and (later) export use this overridden contract; curated theme data is never mutated
- If user clears override, use original theme contract

### Success Criteria
- [ ] User can set one brand color; preview updates
- [ ] Original theme unchanged in data
- [ ] Export (M5) will receive the overridden contract when override is set

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Failure Protocol

Same as prior milestones: 3 attempts → STOP and log; dependency broken → STOP and flag; scope expansion → STOP and propose split.

---

## Milestone Completion Checklist

- [ ] All tasks committed
- [ ] Preconditions verified at start
- [ ] Postconditions: preview screen, token hover, optional override, committed theme for M5
- [ ] Manual: select theme → preview → hover tokens → set brand color → verify preview and that original theme is unchanged
- [ ] No uncommitted changes; PROJECT_STATE updated

**⏸ PAUSE — Human reviews before merge.**

---

## Milestone Verification Log

| Check | Result | Notes |
| --- | --- | --- |
| All tasks committed | ☐ Pass / ☐ Fail | |
| Preconditions verified | ☐ Pass / ☐ Fail | |
| Postconditions verified | ☐ Pass / ☐ Fail | |
| Preview + override flow | ☐ Pass / ☐ Fail | |

**Verification result:** ☐ PASS | ☐ FAIL
**Verified by:** ________________ on ________________
