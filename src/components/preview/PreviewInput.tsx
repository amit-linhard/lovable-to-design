// M2 — PreviewInput: border, radius, focus state driven by DesignContract

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewInputProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
  /** Show focus-ring state. Defaults to true so the preview demonstrates focus styling. */
  focused?: boolean;
  placeholder?: string;
}

export function PreviewInput({
  contract,
  colorOverride,
  focused = true,
  placeholder = "Input value",
}: PreviewInputProps): React.ReactElement {
  const colors: ColorTokens = colorOverride
    ? { ...contract.color, ...colorOverride }
    : contract.color;

  const { fontFamily, baseFontSize, bodyWeight } = contract.typography;
  const { radiusMd, borderWidth, focusRingWidth, focusRingOffset } = contract.shape;
  const binding = contract.componentBinding.input.md;
  const px = contract.spacing[binding.paddingX];
  const py = contract.spacing[binding.paddingY];

  const style: React.CSSProperties = {
    fontFamily,
    fontSize: `${baseFontSize}px`,
    fontWeight: bodyWeight,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    border: `${borderWidth}px solid ${focused ? colors.focusRing : colors.border}`,
    borderRadius: `${radiusMd}px`,
    padding: `${py}px ${px}px`,
    outline: focused
      ? `${focusRingWidth}px solid ${colors.focusRing}`
      : "none",
    outlineOffset: focused ? `${focusRingOffset}px` : undefined,
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <input
      style={style}
      readOnly
      placeholder={placeholder}
      data-testid="preview-input"
      data-focused={focused}
    />
  );
}
