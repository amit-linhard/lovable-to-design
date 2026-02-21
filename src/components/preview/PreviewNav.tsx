// M2 — Preview component stub
// Task 0: signature only; styling in Task 2

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewNavProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
}

export function PreviewNav({
  contract: _contract,
  colorOverride: _colorOverride,
}: PreviewNavProps): React.ReactElement {
  return <nav>Nav</nav>;
}
