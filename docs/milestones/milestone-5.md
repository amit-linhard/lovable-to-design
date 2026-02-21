# Milestone 5: Output Format & Export

**Branch:** `dev-i5`
**Status:** Not Started
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Milestone Objective

**Primary Goal:** User selects one or more output formats (Tailwind / CSS Variables / shadcn/ui — all pre-selected by default); app generates all selected formats and packages them into a .zip bundle; per-format copy-to-clipboard and bulk zip download both work.

**Why Now:** M4 delivers committed theme (with optional brand color). This completes the flow: browse → preview → fine-tune → output format → export.

**Success Definition:** User multi-selects formats on OutputFormat screen (Step 4); arrives at Export screen (Step 5) seeing tabbed code and a mini preview; can copy any single format or download all as .zip.

---

## Scope & Boundaries

### In Scope
- **OutputFormat screen (Step 4):** Multi-select card grid (Tailwind, CSS Variables, shadcn/ui). All 3 pre-selected by default. Disabled "Generate Bundle" if 0 selected. Inline error if empty selection.
- **Export screen (Step 5):** Tabbed code display (one tab per selected format). Summary strip (theme name, font, radius, spacing, PaletteStrip with effective colors). Mini ComponentPreview. Download .zip + copy active tab.
- Three renderers: `(contract: DesignContract, effectiveColors: ColorTokens) => string` per format
- Download: JSZip bundle — `{theme.id}-theme.zip` — containing one file per selected format
- Copy: active format tab only (not the zip)
- ExportFormat: `"tailwind" | "css-vars" | "shadcn"` (UI label "CSS Variables"; file name `variables.css`)
- Paste-ready output (no interpretation required)
- JSZip dependency required

### Explicitly Out of Scope
- Bootstrap / MUI / other formats (v2)
- Direct Lovable/Cursor project attachment (deferred)
- Live preview of generated file (optional per PRD; include only if scoped)

---

## Was It Updated?

| Source | What Changed | Impact on This Milestone | Date |
| --- | --- | --- | --- |
| Session 2 extraction | Export is a **bundle** (multi-select → .zip), not a single-format dropdown | All tasks updated; T0 scaffolds two routes; T1 renderer mapping table added; T2–T3 scope changed | 2026-02-21 |
| Session 2 extraction | Two screens instead of one: `/output-format` (Step 4) + `/export` (Step 5) | T0 must scaffold both routes | 2026-02-21 |
| Session 2 extraction | DesignContract→output field mapping confirmed; color field names differ from Lovable | T1 must use mapping table below | 2026-02-21 |

---

## Preconditions (Input Contract)

| # | Requirement | Provided By | How to Verify | Status |
| --- | --- | --- | --- | --- |
| PC-1 | ExportConfig type and DesignContract types | M1 | Types importable | ☐ Not Checked |
| PC-2 | Selected/committed theme (with optional override) available | M3, M4 | State or context provides contract for export | ☐ Not Checked |

---

## Postconditions (Output Contract)

| # | What Will Exist | Consumed By | How to Verify |
| --- | --- | --- | --- |
| OC-1 | OutputFormat screen (Step 4): multi-select card grid; all 3 pre-selected by default | — | Navigate to /output-format; see 3 cards all checked |
| OC-2 | Three output generators; each returns paste-ready string from DesignContract | — | Each format produces valid, usable output |
| OC-3 | Copy active format to clipboard; download ALL selected formats as .zip (`{theme.id}-theme.zip`) | — | Copy puts single file content in clipboard; download produces zip with N files |
| OC-4 | Full flow reachable: browse → preview → fine-tune → output-format → export | — | User can complete all 5 steps end to end |
| OC-5 | Export screen (Step 5): tabbed code display, summary strip, mini preview, download + copy buttons | — | Navigate to /export; see tabs matching selected formats |

---

## Technical Approach

### Key Decisions
| Decision | Choice Made | Why |
| --- | --- | --- |
| Renderers | Pure functions: `(contract: DesignContract, effectiveColors: ColorTokens) => string` | Testable; no UI in renderer; effectiveColors is pre-applied by caller |
| Output format | Bundle (.zip via JSZip) with per-format files; also per-format copy | Validated by Lovable UX: multi-format is the default, not an option |
| Download | JSZip → Blob → anchor click; filename: `{theme.id}-theme.zip` | Consistent with validated UX |
| Copy | navigator.clipboard.writeText of active tab's string only | Per-format copy is simpler; zip handles the bundle |
| Field mapping | DesignContract fields → output format names per table below | Prevents renderer bugs |

### Renderer Field Mapping (DesignContract → output)

| DesignContract field | Tailwind key | CSS var name | shadcn var name |
|---|---|---|---|
| `color.primary` | `primary` | `--color-primary` | `--primary` (HSL) |
| `color.secondary` | `secondary` | `--color-secondary` | `--secondary` (HSL) |
| `color.accent` | `accent` | `--color-accent` | `--accent` (HSL) |
| `color.background` | `background` | `--color-background` | `--background` (HSL) |
| `color.textPrimary` | `foreground` | `--color-foreground` | `--foreground` (HSL) |
| `color.textSecondary` | `muted` | `--color-muted` | `--muted` (HSL) |
| `color.border` | `border` | `--color-border` | `--border` (HSL) |
| `typography.fontFamily` | `fontFamily.sans` | `--font-family` | (not in shadcn vars) |
| `typography.baseFontSize` (number) | `fontSize.base` as `"{n}px"` | `--font-size-base` as `"{n}px"` | (not in shadcn vars) |
| `typography.bodyLineHeight` (number) | (not in tailwind extend) | `--line-height-base` | (not in shadcn vars) |
| `typography.headingWeight` (number) | (not in tailwind extend) | `--font-weight-heading` | (not in shadcn vars) |
| `shape.radiusMd` (number) | `borderRadius.DEFAULT` as `"{n}px"` | `--radius` as `"{n}px"` | `--radius` as `"{n}px"` |
| `spacing.xs` (number = 4) | `spacing.unit` as `"4px"` | `--spacing-unit` as `"4px"` | (not in shadcn vars) |
| `elevation.sm/md/lg` | `boxShadow.sm/md/lg` | `--shadow-sm/md/lg` | (not in shadcn vars) |

### File Names per Format
| ExportFormat | File in zip | Copy label |
|---|---|---|
| `"tailwind"` | `tailwind.config.js` | "Copy tailwind.config.js" |
| `"css-vars"` | `variables.css` | "Copy variables.css" |
| `"shadcn"` | `shadcn-theme.css` | "Copy shadcn-theme.css" |

### System Areas Affected
**New Modules:** Export renderers (`src/lib/renderers/tailwind.ts`, `css-vars.ts`, `shadcn.ts`), OutputFormat page (`/output-format`), Export page (`/export`)

---

## Tasks Overview

| Task # | Name | Status |
| --- | --- | --- |
| 0 | Create Milestone Skeleton | ☐ Not Started |
| 1 | Output renderers | ☐ Not Started |
| 2 | Format selector & export UI | ☐ Not Started |
| 3 | Copy and download | ☐ Not Started |

---

## Task 0: Create Milestone Skeleton

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Scaffold TWO route screens and renderer stubs. No real output yet.

### What to Produce
- `/output-format` page (Step 4): placeholder for 3 format cards; "Generate Bundle" CTA stub
- `/export` page (Step 5): placeholder for tabbed code area, summary strip, download/copy buttons
- Three renderer stubs with correct signature: `(contract: DesignContract, effectiveColors: ColorTokens) => string`
- JSZip installed in package.json

### Success Criteria
- Both pages load and are reachable in sequence; TypeScript compiles
- Renderer signatures match; no paste-ready content yet

### After Success
Commit: `chore(milestone-5): scaffold skeleton — output-format and export screens, renderer stubs`
**⏸ PAUSE — Human reviews skeleton.**

---

## Task 1: Output Renderers

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Implement three renderers so the app can produce paste-ready Tailwind config, CSS variables block, and shadcn theme override from a DesignContract.

### Preconditions
| TP-1 | Task 0 complete; M1 DesignContract and ExportConfig types available | Types and stubs exist |

### What to Build
- **Tailwind renderer:** `tailwind.config.js` with `theme.extend` — colors, fontFamily, fontSize, borderRadius, spacing, boxShadow from contract. Use field mapping table.
- **CSS Variables renderer:** `:root { ... }` block — CSS custom properties for colors, typography, radius, spacing, elevation. Use field mapping table.
- **shadcn/ui renderer:** `globals.css` `@layer base` block — HSL-converted color variables as shadcn expects. Hex → HSL conversion required.
- Each renderer: `(contract: DesignContract, effectiveColors: ColorTokens) => string`; no UI logic; pure function
- `effectiveColors` is the caller's responsibility (may differ from `contract.color` if accent was overridden)
- Output must be valid and paste-ready

### Success Criteria
- [ ] Each renderer returns a string that is valid for the target format
- [ ] Changing contract (including brand color override) changes output
- [ ] No hardcoded theme in renderers; all values from contract

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 2: Format Selector & Export UI

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Export screen: user chooses format; app displays or previews generated output; placeholders for copy and download.

### Preconditions
| TP-1 | Task 1 complete | Renderers return valid strings |
| TP-2 | Committed theme available from M4 | State or context provides contract |

### What to Build
- **OutputFormat screen (Step 4):**
  - 3 format cards (Tailwind, CSS Variables, shadcn/ui) in card grid, all pre-selected by default
  - Toggle-selectable; check mark on selected state
  - "Generate Bundle" button: enabled only if ≥1 format selected; disabled + inline error if 0
  - Back → `/fine-tune`
- **Export screen (Step 5):**
  - Summary strip: theme name, font, radius, spacing, PaletteStrip (effective colors)
  - Mini ComponentPreview with effective colors
  - Tab bar (one tab per selected format showing filename)
  - Code block: shows generated string for active tab
  - Copy button (active tab), Download .zip button (all selected)
  - Back → `/output-format`; "Pick Different Theme" → `/`

### Success Criteria
- [ ] OutputFormat shows 3 cards all pre-selected; toggles work; empty-selection error shows
- [ ] Export shows tabs matching selected formats; code block updates on tab switch
- [ ] Output reflects current contract + colorOverride

### After Success
Commit; update task status and state.

### If This Task Fails
After 3 attempts: STOP; log; flag.

---

## Task 3: Copy and Download

**Status:** ☐ Not Started
**Attempt:** 1 of 3

### Context
Copy-to-clipboard and file download must work with correct content and filenames so the user gets paste-ready output.

### Preconditions
| TP-1 | Task 2 complete | Export UI shows generated output |
| TP-2 | Renderers produce final string | Output is current when format or theme changes |

### What to Build
- **Copy:** `navigator.clipboard.writeText(activeCode)` for the active tab's string; show “Copied!” feedback for ~2s; catch clipboard-denied errors gracefully
- **Download .zip:** Use JSZip to package all selected formats (each using its file name from mapping table); `zip.generateAsync({ type: “blob” })` → Blob URL → anchor click → `URL.revokeObjectURL`; filename: `{theme.id}-theme.zip`
- Ensure rendered strings are always current (re-compute on theme/format/override change, not cached)
- Handle errors: clipboard denied → catch + show error message

### Success Criteria
- [ ] Copy puts correct single-format output in clipboard; paste in target project works
- [ ] Download produces `{theme.id}-theme.zip` containing one file per selected format with correct content
- [ ] Feedback on copy success/failure
- [ ] No uncommitted changes; PROJECT_STATE updated

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
- [ ] Postconditions: format selector, three renderers, copy + download working
- [ ] E2E or manual: browse → select theme → preview → (optional override) → export → select format → copy and download → verify output in target format
- [ ] No uncommitted changes; PROJECT_STATE updated
- [ ] CHANGELOG_BUILDING.md updated if any cross-milestone impact

**⏸ PAUSE — Human reviews before merge.**

---

## Milestone Verification Log

| Check | Result | Notes |
| --- | --- | --- |
| All tasks committed | ☐ Pass / ☐ Fail | |
| Preconditions verified | ☐ Pass / ☐ Fail | |
| Postconditions verified | ☐ Pass / ☐ Fail | |
| Copy works | ☐ Pass / ☐ Fail | |
| Download works | ☐ Pass / ☐ Fail | |
| Full flow (browse → export) | ☐ Pass / ☐ Fail | |

**Verification result:** ☐ PASS | ☐ FAIL
**Verified by:** ________________ on ________________
