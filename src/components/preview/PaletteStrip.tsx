// M2 — Preview component stub
// Task 0: signature only; styling in Task 1

import React from "react";
import type { ColorTokens } from "@contracts/types";

export interface PaletteStripProps {
  colors: ColorTokens;
  size: "sm" | "md";
}

export function PaletteStrip({
  colors: _colors,
  size: _size,
}: PaletteStripProps): React.ReactElement {
  return <div>PaletteStrip</div>;
}
