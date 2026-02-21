// M2 — Preview component stub
// Task 0: signature only; styling in Task 1

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewCardProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
}

export function PreviewCard({
  contract: _contract,
  colorOverride: _colorOverride,
}: PreviewCardProps): React.ReactElement {
  return <div>Card</div>;
}
