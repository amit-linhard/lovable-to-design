# Building Changelog

> **Purpose:** Track changes that impact milestones other than the one being worked on.
> This file is the bridge between milestones — it prevents "works on my branch" surprises.

**Project:** Design Contract Hub
**Last Updated:** 2026-02-21

---

## How This File Works

After completing a task, check: did anything in the current milestone's Output Contract change from what downstream milestones expect? If yes, log it below. If no, move on.

---

## Change Log

| # | Date | Source | What Changed | Why | Downstream Impact | Milestones Affected |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 2026-02-21 | Pre-M1 | `ColorTokens` uses `textPrimary`, `textSecondary`, `focusRing` instead of `muted`/`success`/`warning`/`error` from M1 spec | More practical for component rendering; semantic state tokens deferred | M2 preview components must use `textPrimary`/`textSecondary` for text; `focusRing` for focus state — not `muted` | M2, M3, M4, M5 |
| 2 | 2026-02-21 | Pre-M1 | `ShapeTokens` uses numeric `radiusSm`, `radiusMd`, `radiusLg` (px values) instead of `sharp \| soft \| pill` union type | Numeric values apply directly to CSS `border-radius`; no aliasing needed | M2 components apply `shape.radiusSm` (number) directly; M5 renderers emit `shape.radiusMd` as `"{n}px"` | M2, M5 |
| 3 | 2026-02-21 | Pre-M1 | `themes.ts` already contains full token data for all 4 themes (normally M3 T1 scope) | Done upfront; M3 T1 is pre-complete | M3 T1 ("Theme content") is already done — verify at start of M3 and mark complete without re-doing | M3 |
| 4 | 2026-02-21 | Pre-M1 | Initial contracts committed to `main` (not `dev-i1`) | Branch discipline not established at init | Historical only; dev-i1 branch created to carry forward; no functional impact | None |
| 5 | 2026-02-21 | Session 2 | `ElevationTokens` interface added; `elevation: ElevationTokens` field added to `DesignContract`; all 4 themes have elevation values | Session 2 extraction: FineTune locked-token panel + Export renderers both require sm/md/lg box-shadow strings | M2 PreviewCard uses `contract.elevation.sm`; M4 FineTune locked-token panel displays all 3 levels; M5 renderers output `boxShadow.*` (Tailwind) and `--shadow-*` (CSS vars) | M2, M4, M5 |
| 6 | 2026-02-21 | Session 2 | M5 export changed from single-format dropdown to multi-format bundle (.zip via JSZip) | Lovable UX validated multi-select + zip download as the correct interaction | M5 T0 scaffolds two routes (`/output-format`, `/export`); WorkflowState needs `outputFormats: ExportFormat[]` (defaults to all 3); JSZip must be installed | M5 |
| 7 | 2026-02-21 | Session 2 | M2 gains `PaletteStrip` component and optional `colorOverride` prop on preview components | PaletteStrip confirmed used in 3 screens; colorOverride needed for FineTune live preview | M3 ThemeCard and M4 Preview sidebar both use PaletteStrip from M2; M4 FineTune passes `effectiveColors` to ComponentPreview | M2, M3, M4 |
| 8 | 2026-02-21 | Session 2 | M4 T2 changed from hover-inspector to static token sidebar on Preview screen | Lovable UX validated simpler static list; no hover-tooltip infrastructure needed | Simpler M4 implementation; no architectural change to contracts | M4 |
| 9 | 2026-02-21 | Session 2 | M5 renderer signature changed: `(contract: DesignContract, effectiveColors: ColorTokens) => string` | Caller pre-applies colorOverride; renderers are simpler; consistent pattern | M5 T1 renderers receive effective colors separately; M4 WorkflowState must provide `getEffectiveColors()` | M5 |

---

## Reference: Where to Find Contracts

| What | Where to Find It |
| --- | --- |
| Current milestone's Output Contract | `docs/milestones/milestone-[N].md` → "Postconditions" section |
| Downstream milestone's Input Contract | `docs/milestones/milestone-[M].md` → "Preconditions" section |
| Milestone dependency graph | `docs/MILESTONE_LIST.md` → "Dependency Graph" |
