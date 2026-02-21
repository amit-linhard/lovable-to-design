# Design Contract Hub — Milestone List

**Project:** Design Contract Hub
**Created:** 2026-02-21
**Last Updated:** 2026-02-21

---

## Product purpose

**Design Contract Hub is the tool users reach after finishing a Lovable prototype — it lets them pick one of four curated design systems and get paste-ready tokens to restyle that prototype.**

- **Who it's for:** Anyone with a naked Lovable mock (no design system, raw layout) who wants to give it a coherent visual language before handing it to a developer.
- **Input:** A Lovable-approved prototype. Structure and UX are already set. User is not designing from scratch.
- **What the app does:** Browse 4 curated themes → preview each on 4 canonical components (Button, Card, Input, Nav) → optionally override one brand color → export paste-ready tokens (Tailwind config / CSS variables / shadcn block).
- **Output:** The user pastes the token file into their project; the naked Lovable prototype is restyled with the chosen design system.
- **Future (not v1):** Render a simulation of the user's actual app with the chosen design system applied.

---

## Iteration 1: MVP — Browse, Preview, Export

### Milestone 1: Foundation & Data Model

**Branch:** `dev-i1`

**Goal:** Establish project structure, data schemas for design contracts, and the 4px spacing scale so all downstream work has a single source of truth for tokens and theme shape.

**Success Definition:** Types/schemas exist and parse; theme data structure is defined; no UI yet.

**PRD Solutions Covered:**
- Core concept (Design Contract contents) — schema definitions for color, typography, shape, spacing, component bindings
- Scope (v1) — 4px base spacing scale locked in

**Scope (High-Level):**
- In: DesignContract, ColorTokens, TypographyTokens, ShapeTokens, SpacingScale, ComponentBinding, ExportConfig; 4px base scale; seed structure for four themes
- Out: No UI; no theme content (only shape); no framework output

**Key Technical Decisions:**
- Schema format: TypeScript types/interfaces — app is TypeScript/React; enables type-safe theme consumption
- Theme data: In-code JSON/objects (v1) — no CMS/API; curated themes ship with app
- Spacing: 4px base only in v1 — PRD locks this; configurable base deferred

**Input Contract (What Must Exist Before Starting):**
- None — this is the first milestone

**Output Contract (What This Delivers to Downstream Milestones):**
- `DesignContract` (and nested token types) defined and importable
- `ExportConfig` type (output format: tailwind | css-vars | shadcn)
- 4px spacing scale constants and named steps
- Placeholder theme data structure (empty or stub entries) so M2/M3 can depend on shape

**Task Sketch:**

| # | Task Name | One-Line Description |
| --- | --- | --- |
| 0 | Skeleton | Scaffold files, type definitions, theme data file stubs |
| 1 | Design contract types | Define DesignContract, ColorTokens, TypographyTokens, ShapeTokens, SpacingScale, ComponentBinding, ExportConfig |
| 2 | Spacing scale | Implement 4px base scale and named steps; component binding map (sm/md/lg) |
| 3 | Theme data shape | Add theme data module with structure for four themes (no full content yet if needed for M2) |

---

### Milestone 2: Canonical Preview Components

**Branch:** `dev-i2`

**Goal:** Build the four canonical preview components (Button, Card, Input, Nav) that render from a Design Contract so browse and preview screens can show real component previews.

**Success Definition:** All four components render correctly when given a contract; primary + ghost Button; Card with surface/elevation; Input with border/focus; Nav with spacing and active state.

**PRD Solutions Covered:**
- The four canonical preview components — Button (primary + ghost), Card, Input field, Nav bar
- Design Contract contents — component bindings (sm/md/lg) and token application

**Scope (High-Level):**
- In: Theme-aware Button, Card, Input, Nav; tokens applied from contract (color, typography, shape, spacing)
- Out: No browse grid; no export; no full app flow

**Key Technical Decisions:**
- Components accept `DesignContract` (or a slice) as prop — single source of truth per preview
- Styling: CSS variables or inline theme from contract — so one contract drives all four
- No framework output yet — display only

**Input Contract:**
- Milestone 1: DesignContract type and token types; spacing scale; theme data structure available

**Output Contract:**
- Preview components: `PreviewButton`, `PreviewCard`, `PreviewInput`, `PreviewNav` (or equivalent) exportable and renderable with any valid contract
- Contract applied consistently (colors, radius, typography, spacing from contract)

**Task Sketch:**

| # | Task Name | One-Line Description |
| --- | --- | --- |
| 0 | Skeleton | Scaffold component files and story/page to render all four with a stub contract |
| 1 | Button & Card | Implement Button (primary + ghost) and Card; apply contract tokens |
| 2 | Input & Nav | Implement Input (border, focus) and Nav (spacing, active state); apply contract tokens |
| 3 | Token application | Ensure all four use color, typography, shape, spacing from contract; no hardcoded design |

---

### Milestone 3: Theme Library & Browse Screen

**Branch:** `dev-i3`

**Goal:** Ship the four curated themes (Clean Pro, Warm Editorial, Dense Data, Soft Product) and the browse screen: grid of theme cards with name, palette swatches, and thumbnail of canonical components.

**Success Definition:** User sees a grid of four theme cards; each card shows name, swatches, and a small preview of the four components in that theme; selecting a card is possible (state/navigation).

**PRD Solutions Covered:**
- Theme library (v1) — four curated themes with distinct personalities
- Primary user flow Step 1 — Browse: grid of theme cards, name, swatches, thumbnail of canonical components

**Scope (High-Level):**
- In: Full data for Clean Pro, Warm Editorial, Dense Data, Soft Product; browse screen with grid; thumbnails using M2 components
- Out: No full-page preview yet; no export; no fine-tune (brand color) UI

**Key Technical Decisions:**
- Theme content: Populate theme data from M1 with full token values for each of the four themes
- Thumbnail: Render the four canonical components at small scale (or single composite) per card — re-use M2 components
- Navigation: Select card → store selected theme; next milestone shows preview

**Input Contract:**
- Milestone 1: Theme data structure and types
- Milestone 2: Canonical preview components that accept a contract

**Output Contract:**
- Four themes fully defined and loadable
- Browse screen: grid of four cards; each card shows name, swatches, thumbnail
- Selected theme available to downstream (state or URL) for preview and export

**Task Sketch:**

| # | Task Name | One-Line Description |
| --- | --- | --- |
| 0 | Skeleton | Scaffold browse page, theme card component, and theme data imports |
| 1 | Theme content | Define full token values for Clean Pro, Warm Editorial, Dense Data, Soft Product |
| 2 | Theme cards | Build theme card component: name, palette swatches, thumbnail using canonical components |
| 3 | Browse grid & selection | Browse screen with grid of four cards; selection updates state for preview/export |

---

### Milestone 4: Preview Flow & Optional Brand Color

**Branch:** `dev-i4`

**Goal:** Full preview experience: selecting a theme shows all four canonical components in that theme; token values visible on hover; optional one brand color override within the selected theme.

**Success Definition:** User can open a full preview for the selected theme; see Button, Card, Input, Nav in that theme; hover to see token values; optionally swap one palette tone for a brand color (palette/font/shape otherwise locked).

**PRD Solutions Covered:**
- Primary user flow Step 2 — Preview: full preview with all four components, token values on hover
- Primary user flow Step 3 — Fine-tune (optional): one palette tone swap for brand color; font and shape locked

**Scope (High-Level):**
- In: Full preview screen; token-on-hover; optional brand color override (one tone)
- Out: No output format selection; no export; full palette customization deferred

**Key Technical Decisions:**
- Preview screen: Single screen that receives selected theme and renders all four canonical components at full size
- Token on hover: Expose token name + value (e.g. tooltip or sidebar) for the element under cursor
- Brand color: One accent (or primary) override; contract stays locked for typography and shape

**Input Contract:**
- Milestone 2: Canonical preview components
- Milestone 3: Selected theme available; four themes defined

**Output Contract:**
- Preview screen renders selected theme with all four components
- Token values visible on hover for key elements
- Optional brand color override applied to contract copy (no mutation of curated theme)
- “Committed” theme (with optional override) available for export

**Task Sketch:**

| # | Task Name | One-Line Description |
| --- | --- | --- |
| 0 | Skeleton | Scaffold preview screen and navigation from browse |
| 1 | Full preview screen | Preview page: render all four canonical components with selected theme |
| 2 | Token values on hover | Show token name + value on hover for colors, type, spacing where relevant |
| 3 | Optional brand color override | UI to set one palette tone (e.g. accent); apply to contract copy for preview and export |

---

### Milestone 5: Output Format & Export

**Branch:** `dev-i5`

**Goal:** User selects output format (Tailwind / CSS Variables / shadcn/ui); app renders the selected theme (with optional override) into that format; copy-to-clipboard and download.

**Success Definition:** User can choose Tailwind, CSS Vars, or shadcn; see or receive a paste-ready file; copy and download both work.

**PRD Solutions Covered:**
- Framework output (v1) — Tailwind, CSS Variables, shadcn/ui
- Primary user flow Step 4–5 — Select output format; export (copy + download)
- Output is paste-ready — no interpretation required

**Scope (High-Level):**
- In: Output format dropdown; renderers for tailwind.config.js, :root CSS variables, shadcn theme block; copy + download
- Out: Bootstrap/MUI/other formats; direct Lovable/Cursor project attachment (deferred)

**Key Technical Decisions:**
- Three renderers: one per format; input = DesignContract (with any overrides); output = string
- Copy: clipboard API; download: blob + anchor with filename (e.g. tailwind.config.js or theme.css)
- Optional: show live preview of generated file before copy/download (open question in PRD)

**Input Contract:**
- Milestone 1: ExportConfig type; DesignContract and token types
- Milestone 3: Selected theme
- Milestone 4: Committed theme (with optional brand color override) available

**Output Contract:**
- Format selector (Tailwind / CSS Vars / shadcn) in UI
- Three output generators; each returns paste-ready string
- Copy-to-clipboard and download both functional
- Export screen reachable from preview (or as final step in flow)

**Task Sketch:**

| # | Task Name | One-Line Description |
| --- | --- | --- |
| 0 | Skeleton | Scaffold export screen, format selector, and renderer stubs |
| 1 | Output renderers | Implement Tailwind, CSS Variables, and shadcn renderers from DesignContract |
| 2 | Format selector & export UI | Export screen: dropdown for format; display or preview of output; copy + download buttons |
| 3 | Copy and download | Wire copy-to-clipboard and file download with correct filename per format |

---

## Dependency Graph

```
M1 (foundation) → M2 (canonical components) → M3 (browse + themes)
       ↓                      ↓                        ↓
       └──────────────────────┴────────────────────────┴→ M4 (preview + brand color) → M5 (export)
```

## Contract Chain Summary

| Milestone | Consumes (Input Contract) | Produces (Output Contract) | Consumed By |
| --- | --- | --- | --- |
| M1 | Nothing | Types, spacing scale, theme data structure | M2, M3, M5 |
| M2 | M1: types, structure | Preview components (Button, Card, Input, Nav) | M3, M4 |
| M3 | M1: types/structure; M2: components | Four themes, browse screen, selected theme | M4, M5 |
| M4 | M2: components; M3: selected theme | Preview screen, token-on-hover, theme + optional override | M5 |
| M5 | M1: ExportConfig/types; M3: theme; M4: committed theme | Format selector, renderers, copy + download | — |

---

## Translation Checklist

Before generating milestone files from this list, verify:

- [x] Every solution from the PRD's "Solutions Prioritization" is assigned to a milestone
- [x] No solution is assigned to two milestones (unless explicitly split with clear boundaries)
- [x] Every Input Contract has a matching Output Contract from an earlier milestone
- [x] The dependency graph has no circular dependencies
- [x] Task sketches cover all functionality in scope (no gaps between tasks and scope)
- [x] Out-of-scope items are assigned to future milestones (not lost)
