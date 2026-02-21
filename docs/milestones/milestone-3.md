# Milestone 3: Theme Library & Browse Screen

**Branch:** `dev-i3`
**Status:** Not Started
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Milestone Objective

**Primary Goal:** Ship the four curated themes (Clean Pro, Warm Editorial, Dense Data, Soft Product) and the browse screen: grid of theme cards with name, palette swatches, and thumbnail of canonical components.

**Why Now:** M1 has types and theme structure; M2 has preview components. This delivers the first user-visible flow (browse).

**Success Definition:** User sees a grid of four theme cards; each shows name, swatches, and a small preview of the four components; selecting a card updates state for preview/export.

---

## Scope & Boundaries

### In Scope
- Full token data for Clean Pro, Warm Editorial, Dense Data, Soft Product
- Browse screen with grid of four theme cards
- Each card: name, palette swatches, thumbnail using M2 components
- Selection state (selected theme available for M4/M5)

### Explicitly Out of Scope
- Full-page preview (M4)
- Export or output format (M5)
- Fine-tune / brand color UI (M4)
- User-created or imported themes

---

## Was It Updated?

| Source | What Changed | Impact on This Milestone | Date |
| --- | --- | --- | --- |
| Session 2 extraction | Theme count: M1 spec = 4 themes; Lovable validated 8 (different names). **Decision: keep 4 M1 themes.** | T1 is pre-complete (themes.ts already has full token data) | 2026-02-21 |
| Session 2 extraction | On theme selection: must reset colorOverride to null | Add to T3 "Browse Grid & Selection" | 2026-02-21 |

---

## Preconditions (Input Contract)

| # | Requirement | Provided By | How to Verify | Status |
| --- | --- | --- | --- | --- |
| PC-1 | DesignContract type and theme data structure | M1 | Types and theme module importable | ☐ Not Checked |
| PC-2 | PreviewButton, PreviewCard, PreviewInput, PreviewNav | M2, OC-1 | Components render with contract | ☐ Not Checked |

---

## Postconditions (Output Contract)

| # | What Will Exist | Consumed By | How to Verify |
| --- | --- | --- | --- |
| OC-1 | Four themes fully defined and loadable | M4, M5 | Theme list has 4 entries with full tokens |
| OC-2 | Browse screen: grid of four cards; name, swatches, thumbnail per card | M4 | Navigate to browse; see grid | |
| OC-3 | Selected theme available (state or URL) for preview and export | M4, M5 | Select card; downstream can read selection |

---

## Technical Approach

### Key Decisions
| Decision | Choice Made | Why |
| --- | --- | --- |
| Thumbnail | Render M2 components at small scale per card | PRD: thumbnail of canonical components |
| Selection | Global state or route param | M4/M5 need selected theme |

### System Areas Affected
**Modules Modified/Created:** Theme data (full content), browse page, theme card component

---

## Tasks Overview

| Task # | Name | Status |
| --- | --- | --- |
| 0 | Create Milestone Skeleton | ☐ Not Started |
| 1 | Theme content | ☐ Not Started |
| 2 | Theme cards | ☐ Not Started |
| 3 | Browse grid & selection | ☐ Not Started |

---

## Task 0: Create Milestone Skeleton

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Scaffold browse page, theme card component, and theme data imports. No full content or styling yet.

### What to Produce
- Browse page/route with placeholder grid
- ThemeCard component with props (theme, onSelect?) and placeholder content
- Imports from theme data module

### Success Criteria
- Browse route loads; grid placeholder and card stubs exist; compile OK

### After Success
Commit: `chore(milestone-3): scaffold skeleton — browse page and theme card stubs`
**⏸ PAUSE — Human reviews skeleton.**

---

## Task 1: Theme Content

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Populate theme data with full token values for Clean Pro, Warm Editorial, Dense Data, Soft Product per PRD personalities.

### Preconditions
| TP-1 | Task 0 complete; M1 theme structure exists | Theme module and types available |

### What to Build
- **Clean Pro:** Sharp corners, neutral grays, monospace accents (SaaS/dashboards)
- **Warm Editorial:** Serif typography, terracotta accent, cream background (content/blogs)
- **Dense Data:** Dark base, monospace, sky blue accent (dev tools/analytics)
- **Soft Product:** Pill shapes, violet accent, white cards on light tint (consumer/onboarding)
Each theme: full ColorTokens, TypographyTokens, ShapeTokens, SpacingScale, ComponentBinding.

### Success Criteria
- All four themes load; each has distinct visual personality; TypeScript validates shape

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 2: Theme Cards

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Build the theme card: name, palette swatches, and thumbnail of the four canonical components in that theme.

### Preconditions
| TP-1 | Task 1 complete; M2 components available | Four themes defined; preview components importable |

### What to Build
- Theme card UI: theme name, color swatches (primary, accent, surface, etc.), thumbnail area
- Thumbnail: render PreviewButton, PreviewCard, PreviewInput, PreviewNav at small scale using the theme’s contract
- Card is clickable or has explicit “Select” for M3 Task 3

### Success Criteria
- Each card shows correct name and swatches; thumbnail shows all four components in that theme’s style
- No abstract swatches only — PRD requires component preview

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 3: Browse Grid & Selection

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Compose browse screen: grid of four theme cards; selection updates state so M4 (preview) and M5 (export) can use it.

### Preconditions
| TP-1 | Task 2 complete | Theme cards with thumbnails exist |

### What to Build
- Browse screen: grid layout of four theme cards (responsive if needed)
- On card select: set selected theme in app state (or URL); ensure M4/M5 can read it
- On card select: also reset colorOverride to null — prevents stale override from prior theme carrying into FineTune
- Optional: highlight selected card; “Preview” or “Next” to go to preview (navigation can be wired in M4)

### Success Criteria
- Grid displays four cards; selection persists; downstream can read selected theme
- [ ] Selected theme ID or object available to other milestones

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Failure Protocol

Same as M1/M2: 3 attempts → STOP and log; dependency broken → STOP and flag; scope expansion → STOP and propose split.

---

## Milestone Completion Checklist

- [ ] All tasks committed
- [ ] Preconditions verified at start
- [ ] Postconditions: four themes, browse grid, selection available
- [ ] Manual: open browse, see four cards with thumbnails, select one
- [ ] No uncommitted changes; PROJECT_STATE updated

**⏸ PAUSE — Human reviews before merge.**

---

## Milestone Verification Log

| Check | Result | Notes |
| --- | --- | --- |
| All tasks committed | ☐ Pass / ☐ Fail | |
| Preconditions verified | ☐ Pass / ☐ Fail | |
| Postconditions verified | ☐ Pass / ☐ Fail | |
| Browse flow works | ☐ Pass / ☐ Fail | |

**Verification result:** ☐ PASS | ☐ FAIL
**Verified by:** ________________ on ________________
