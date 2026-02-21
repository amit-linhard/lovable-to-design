# lovable-to-design

**Design Contract Hub** — a standalone tool that helps users pick a design system to apply to a naked Lovable prototype and export paste-ready tokens.

---

## What this is

After you finish a Lovable prototype, the output is "naked" — raw layout, default Tailwind colors, no coherent visual language. This tool is the next step: pick one of four curated design systems, preview it on canonical components, override a brand color, and export paste-ready tokens.

**Input:** A Lovable-approved prototype (structure and UX already set).  
**Output:** A token file (Tailwind config / CSS variables / shadcn block) the user pastes in to restyle the prototype.

---

## Build plan

Full milestone plan is in `docs/MILESTONE_LIST.md`.

| M | Name | Goal |
|---|------|------|
| M1 | Foundation & Data Model | Types, schemas, 4px spacing scale |
| M2 | Theme Content | 4 curated themes fully populated |
| M3 | Browse & Preview UI | Hub grid + component preview panel |
| M4 | Color Override & Export | Brand color slot + token export (3 formats) |
| M5 | Polish & Deploy | Error states, a11y, Vercel deploy |

---

## Agent

Built by **Claude Code**. Branch convention: `main` → work branches `i1`, `i2`, `i3` …

---

## Status

M1 foundation files committed: `src/contracts/` (types, themes, spacing, tests).
