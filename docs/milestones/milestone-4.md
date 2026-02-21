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
| Session 2 extraction | T2: "Token values on hover" replaced by static token sidebar on Preview screen — simpler validated UX | T2 implementation is significantly simpler; no hover-inspector infrastructure needed | 2026-02-21 |
| Session 2 extraction | T3: Brand color override confirmed accent-only; UX includes hue slider + hex input + 6 suggested pairings + "Skip" link | Spec now explicit; hue slider is validated pattern | 2026-02-21 |

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

## Task 2: Token Sidebar on Preview Screen

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Validated UX (Session 2): the Preview screen shows a static token sidebar listing key token values, each with a lock icon (🔒) indicating it cannot be changed here. This replaces the PRD’s hover-inspector approach — the Lovable prototype confirmed the simpler static sidebar is sufficient and cleaner.

### Preconditions
| TP-1 | Task 1 complete | Full preview screen works |

### What to Build
- Static token sidebar panel on the Preview screen
- Lists: Font family, Base font size, Line height, Heading weight, Radius (display value), Spacing unit
- Each row: label + value + 🔒 lock icon
- Values sourced from `selectedTheme` contract fields
- No hover interactions or tooltips needed

### Success Criteria
- [ ] Sidebar visible alongside ComponentPreview on Preview screen
- [ ] All 6 token rows present with correct values from contract
- [ ] Values update when a different theme is selected

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 3: Optional Brand Color Override

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Validated UX (Session 2): FineTune screen allows swapping the `accent` token only. Typography, shape, spacing, and elevation stay locked. UI confirmed: hue slider (0–360 → HSL→hex), native color picker, hex text input, 6 suggested pairings (derived from theme’s accent + primary). “Apply & Continue” saves override; “Skip this step →” clears it.

### Preconditions
| TP-1 | Task 1 and 2 complete | Preview screen and token sidebar work |

### What to Build
- FineTune screen (Step 3): accent color swap only
- Hue slider (full spectrum gradient background, 0–360)
- Hex color picker (native `<input type=”color”>`) + hex text input (synchronized)
- 6 suggested pairings: derived from `selectedTheme.color.accent` and `selectedTheme.color.primary`
- Locked tokens panel showing typography, radius, spacing, elevation (sm/md/lg) — visual but immutable
- Live ComponentPreview on right using `effectiveColors = { ...contract.color, accent: hexValue }`
- “Apply & Continue”: write `colorOverride = { key: “accent”, value: hexValue }`, navigate to `/output-format`
- “Skip this step →”: write `colorOverride = null`, navigate to `/output-format`
- On load: pre-populate from `colorOverride?.value` if user navigated back; else `selectedTheme.color.accent`
- **Never mutate the curated theme** — override is ephemeral state only

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
