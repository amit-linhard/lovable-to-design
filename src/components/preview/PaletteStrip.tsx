// M2 — PaletteStrip: labeled row of color swatches from ColorTokens

import React from "react";
import type { ColorTokens } from "@contracts/types";

export interface PaletteStripProps {
  colors: ColorTokens;
  size: "sm" | "md";
}

const COLOR_KEYS: (keyof ColorTokens)[] = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "textPrimary",
  "textSecondary",
  "border",
  "focusRing",
];

const LABELS: Record<keyof ColorTokens, string> = {
  primary:       "Primary",
  secondary:     "Secondary",
  accent:        "Accent",
  background:    "BG",
  surface:       "Surface",
  textPrimary:   "Text",
  textSecondary: "Muted",
  border:        "Border",
  focusRing:     "Focus",
};

export function PaletteStrip({ colors, size }: PaletteStripProps): React.ReactElement {
  const swatchPx = size === "sm" ? 24 : 40;
  const fontSize = size === "sm" ? 9 : 11;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: size === "sm" ? "6px" : "8px",
        alignItems: "flex-start",
      }}
      data-testid="palette-strip"
    >
      {COLOR_KEYS.map((key) => (
        <div
          key={key}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
          data-color-key={key}
        >
          <div
            style={{
              width: `${swatchPx}px`,
              height: `${swatchPx}px`,
              backgroundColor: colors[key],
              borderRadius: "3px",
              outline: "1px solid rgba(0,0,0,0.12)",
            }}
            data-color-value={colors[key]}
          />
          <span style={{ fontSize: `${fontSize}px`, color: "#6B7280", textAlign: "center" }}>
            {LABELS[key]}
          </span>
        </div>
      ))}
    </div>
  );
}
