// M2 — PreviewButton: primary + ghost variants driven entirely by DesignContract

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewButtonProps {
  contract: DesignContract;
  variant?: "primary" | "ghost";
  colorOverride?: Partial<ColorTokens>;
  label?: string;
}

export function PreviewButton({
  contract,
  variant = "primary",
  colorOverride,
  label = "Button",
}: PreviewButtonProps): React.ReactElement {
  const colors: ColorTokens = colorOverride
    ? { ...contract.color, ...colorOverride }
    : contract.color;

  const { fontFamily, baseFontSize, bodyWeight } = contract.typography;
  const { radiusSm, borderWidth } = contract.shape;
  const binding = contract.componentBinding.button.md;
  const px = contract.spacing[binding.paddingX];
  const py = contract.spacing[binding.paddingY];

  const base: React.CSSProperties = {
    fontFamily,
    fontSize: `${baseFontSize}px`,
    fontWeight: bodyWeight,
    borderRadius: `${radiusSm}px`,
    padding: `${py}px ${px}px`,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    lineHeight: `${contract.typography.bodyLineHeight}`,
  };

  const style: React.CSSProperties =
    variant === "primary"
      ? {
          ...base,
          backgroundColor: colors.primary,
          color: "#FFFFFF", // no onPrimary token in DesignContract; all themes use dark/saturated primary
          border: "none",
        }
      : {
          ...base,
          backgroundColor: "transparent",
          color: colors.primary,
          border: `${borderWidth}px solid ${colors.primary}`,
        };

  return (
    <button style={style} data-variant={variant}>
      {label}
    </button>
  );
}
