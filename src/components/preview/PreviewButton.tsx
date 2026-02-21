// M2 — Preview component stub
// Task 0: signature only; styling in Task 1

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewButtonProps {
  contract: DesignContract;
  variant?: "primary" | "ghost";
  colorOverride?: Partial<ColorTokens>;
}

export function PreviewButton({
  contract: _contract,
  variant: _variant = "primary",
  colorOverride: _colorOverride,
}: PreviewButtonProps): React.ReactElement {
  return <button>Button</button>;
}
