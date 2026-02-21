// M2 — Composite preview: renders all five components with a given contract.
// Used by Preview and FineTune screens; also serves as the Task 0 render sanity check.

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";
import { PreviewButton } from "./PreviewButton";
import { PreviewCard } from "./PreviewCard";
import { PreviewInput } from "./PreviewInput";
import { PreviewNav } from "./PreviewNav";
import { PaletteStrip } from "./PaletteStrip";

export interface ComponentPreviewProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
}

export function ComponentPreview({
  contract,
  colorOverride,
}: ComponentPreviewProps): React.ReactElement {
  const effectiveColors: ColorTokens = colorOverride
    ? { ...contract.color, ...colorOverride }
    : contract.color;

  return (
    <div>
      <PreviewNav contract={contract} colorOverride={colorOverride} />
      <PreviewCard contract={contract} colorOverride={colorOverride} />
      <PreviewInput contract={contract} colorOverride={colorOverride} />
      <PreviewButton contract={contract} variant="primary" colorOverride={colorOverride} />
      <PreviewButton contract={contract} variant="ghost" colorOverride={colorOverride} />
      <PaletteStrip colors={effectiveColors} size="md" />
    </div>
  );
}
