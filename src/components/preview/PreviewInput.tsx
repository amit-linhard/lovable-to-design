// M2 — Preview component stub
// Task 0: signature only; styling in Task 2

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewInputProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
}

export function PreviewInput({
  contract: _contract,
  colorOverride: _colorOverride,
}: PreviewInputProps): React.ReactElement {
  return <input readOnly placeholder="Input" />;
}
