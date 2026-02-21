// Design Contract Hub — theme data module
// M1: Foundation & Data Model
// Stub entries with correct shape; full token values populated in M3.

import type { DesignContract } from "./types";
import { spacing, defaultComponentBinding } from "./spacing";

// ─── Theme stubs ─────────────────────────────────────────────────────────────
// Color, typography, and shape values are placeholders — intentionally minimal
// so M2 (canonical components) can import the structure without blocking on M3.

export const cleanPro: DesignContract = {
  id: "clean-pro",
  name: "Clean Pro",
  description: "Crisp, minimal, high-contrast. Helvetica-meets-Linear.",
  color: {
    primary:       "#0F172A",
    secondary:     "#334155",
    accent:        "#3B82F6",
    background:    "#FFFFFF",
    surface:       "#F8FAFC",
    textPrimary:   "#0F172A",
    textSecondary: "#64748B",
    border:        "#E2E8F0",
    focusRing:     "#3B82F6",
  },
  typography: {
    fontFamily:           "'Inter', 'Helvetica Neue', sans-serif",
    baseFontSize:         14,
    scaleRatio:           1.25,
    bodyWeight:           400,
    headingWeight:        600,
    headingLetterSpacing: -0.02,
    bodyLineHeight:       1.5,
  },
  shape: {
    radiusSm:       4,
    radiusMd:       6,
    radiusLg:       8,
    borderWidth:    1,
    focusRingWidth: 2,
    focusRingOffset: 2,
  },
  spacing,
  componentBinding: defaultComponentBinding,
  elevation: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.07)",
    lg: "0 10px 15px rgba(0,0,0,0.10)",
  },
};

export const warmEditorial: DesignContract = {
  id: "warm-editorial",
  name: "Warm Editorial",
  description: "Humanist serif warmth. Editorial, readable, trustworthy.",
  color: {
    primary:       "#1C1917",
    secondary:     "#44403C",
    accent:        "#D97706",
    background:    "#FAFAF9",
    surface:       "#F5F5F4",
    textPrimary:   "#1C1917",
    textSecondary: "#78716C",
    border:        "#D6D3D1",
    focusRing:     "#D97706",
  },
  typography: {
    fontFamily:           "'Lora', 'Georgia', serif",
    baseFontSize:         16,
    scaleRatio:           1.333,
    bodyWeight:           400,
    headingWeight:        700,
    headingLetterSpacing: -0.01,
    bodyLineHeight:       1.65,
  },
  shape: {
    radiusSm:        2,
    radiusMd:        4,
    radiusLg:        6,
    borderWidth:     1,
    focusRingWidth:  2,
    focusRingOffset: 2,
  },
  spacing,
  componentBinding: defaultComponentBinding,
  elevation: {
    sm: "0 1px 3px rgba(28,25,23,0.06)",
    md: "0 4px 8px rgba(28,25,23,0.08)",
    lg: "0 12px 20px rgba(28,25,23,0.12)",
  },
};

export const denseData: DesignContract = {
  id: "dense-data",
  name: "Dense Data",
  description: "Information-dense, compact, monospace-accented. Bloomberg meets Notion.",
  color: {
    primary:       "#111827",
    secondary:     "#374151",
    accent:        "#10B981",
    background:    "#0F172A",
    surface:       "#1E293B",
    textPrimary:   "#F1F5F9",
    textSecondary: "#94A3B8",
    border:        "#334155",
    focusRing:     "#10B981",
  },
  typography: {
    fontFamily:           "'JetBrains Mono', 'Fira Code', monospace",
    baseFontSize:         13,
    scaleRatio:           1.2,
    bodyWeight:           400,
    headingWeight:        500,
    headingLetterSpacing: 0,
    bodyLineHeight:       1.4,
  },
  shape: {
    radiusSm:        2,
    radiusMd:        3,
    radiusLg:        4,
    borderWidth:     1,
    focusRingWidth:  1,
    focusRingOffset: 1,
  },
  spacing,
  componentBinding: defaultComponentBinding,
  elevation: {
    sm: "0 1px 3px rgba(0,0,0,0.30)",
    md: "0 4px 12px rgba(0,0,0,0.40)",
    lg: "0 8px 24px rgba(0,0,0,0.50)",
  },
};

export const softProduct: DesignContract = {
  id: "soft-product",
  name: "Soft Product",
  description: "Friendly, rounded, pastel-hued. Consumer SaaS warmth.",
  color: {
    primary:       "#7C3AED",
    secondary:     "#A78BFA",
    accent:        "#EC4899",
    background:    "#FAFAFE",
    surface:       "#F5F3FF",
    textPrimary:   "#1E1B4B",
    textSecondary: "#6B7280",
    border:        "#DDD6FE",
    focusRing:     "#7C3AED",
  },
  typography: {
    fontFamily:           "'Plus Jakarta Sans', 'DM Sans', sans-serif",
    baseFontSize:         15,
    scaleRatio:           1.25,
    bodyWeight:           400,
    headingWeight:        700,
    headingLetterSpacing: -0.01,
    bodyLineHeight:       1.55,
  },
  shape: {
    radiusSm:        8,
    radiusMd:        12,
    radiusLg:        16,
    borderWidth:     1,
    focusRingWidth:  2,
    focusRingOffset: 2,
  },
  spacing,
  componentBinding: defaultComponentBinding,
  elevation: {
    sm: "0 1px 3px rgba(124,58,237,0.06)",
    md: "0 4px 8px rgba(124,58,237,0.08)",
    lg: "0 10px 20px rgba(124,58,237,0.12)",
  },
};

// ─── Theme registry ──────────────────────────────────────────────────────────

export const themes: DesignContract[] = [
  cleanPro,
  warmEditorial,
  denseData,
  softProduct,
];

export function getTheme(id: string): DesignContract | undefined {
  return themes.find((t) => t.id === id);
}
