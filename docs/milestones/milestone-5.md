# Milestone 5: Output Format & Export

**Branch:** `dev-i5`
**Status:** Not Started
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Milestone Objective

**Primary Goal:** User selects output format (Tailwind / CSS Variables / shadcn/ui); app renders the selected theme (with optional override) into that format; copy-to-clipboard and download.

**Why Now:** M4 delivers committed theme (with optional brand color). This completes the flow: browse → preview → export.

**Success Definition:** User can choose Tailwind, CSS Vars, or shadcn; receive a paste-ready file; copy and download both work.

---

## Scope & Boundaries

### In Scope
- Output format dropdown: Tailwind, CSS Variables, shadcn/ui
- Three renderers: DesignContract → string per format
- Copy-to-clipboard and file download
- Export screen reachable from preview (or as final step)
- Paste-ready output (no interpretation required)

### Explicitly Out of Scope
- Bootstrap / MUI / other formats (v2)
- Direct Lovable/Cursor project attachment (deferred)
- Live preview of generated file (optional per PRD; include only if scoped)

---

## Was It Updated?

| Source | What Changed | Impact on This Milestone | Date |
| --- | --- | --- | --- |
| — | No changes | — | — |

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
| OC-1 | Format selector (Tailwind / CSS Vars / shadcn) in UI | — | Export screen has dropdown |
| OC-2 | Three output generators; each returns paste-ready string | — | Each format produces valid, usable output |
| OC-3 | Copy-to-clipboard and download both work | — | User can copy and download with correct filename |
| OC-4 | Export screen reachable from flow | — | User can complete browse → preview → export |

---

## Technical Approach

### Key Decisions
| Decision | Choice Made | Why |
| --- | --- | --- |
| Renderers | Pure functions: (contract: DesignContract, format: ExportConfig['format']) => string | Testable; no UI in renderer |
| Download | Blob + anchor; filename by format (e.g. tailwind.config.js, theme.css) | PRD: paste-ready; framework-specific names |
| Copy | navigator.clipboard.writeText | Standard; fallback optional |

### System Areas Affected
**New Modules:** Export renderers (tailwind, css-vars, shadcn), export page, format selector component

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
Scaffold export screen, format selector, and renderer stubs. No real output yet.

### What to Produce
- Export route/page with placeholder for format dropdown and output area
- Three renderer modules or functions with signature `(contract: DesignContract) => string` returning stub strings
- Format type from M1 (ExportConfig) used in selector

### Success Criteria
- Export page loads; dropdown and stubs exist; TypeScript compiles
- No paste-ready content yet

### After Success
Commit: `chore(milestone-5): scaffold skeleton — export screen and renderer stubs`
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
- **Tailwind:** Generate `tailwind.config.js` (or .ts) with theme extension: colors, fontFamily, borderRadius, spacing, etc. from contract
- **CSS Variables:** Generate `:root { ... }` with CSS custom properties for colors, spacing, typography, shape
- **shadcn/ui:** Generate component theme override block (variables or config) that shadcn expects
- Each renderer: input = DesignContract (with any overrides from M4); output = string; no UI logic
- Output must be valid and paste-ready (run through linter or manual check)

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
- Format selector: dropdown or tabs for Tailwind / CSS Variables / shadcn
- On format change: run appropriate renderer with current committed contract; show result in text area or code block
- Optional: live preview of file (per PRD open question); if out of scope, show output text only
- Copy and Download buttons (wire in Task 3)
- Navigation: from preview to export; or export as final step in flow

### Success Criteria
- [ ] Selecting format updates displayed output
- [ ] Output matches selected format and current contract
- [ ] Export screen is reachable after preview (or from browse if flow is linear)

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
- **Copy:** On “Copy” click, write current output string to clipboard (navigator.clipboard.writeText); show brief feedback (e.g. “Copied”)
- **Download:** On “Download” click, create blob with current output; suggest filename by format (e.g. tailwind.config.js, theme.css, shadcn-theme.css or similar)
- Ensure content is the same as displayed (no stale data)
- Handle errors (e.g. clipboard denied) gracefully

### Success Criteria
- [ ] Copy puts correct output in clipboard; paste in target project works
- [ ] Download produces file with correct content and sensible filename
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
