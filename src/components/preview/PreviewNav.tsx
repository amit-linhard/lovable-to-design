// M2 — PreviewNav: background, item spacing, active-state treatment from DesignContract

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewNavProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
  /** 0-indexed active item. Defaults to 0. */
  activeIndex?: number;
  items?: string[];
}

const DEFAULT_ITEMS = ["Browse", "Preview", "Export"];

export function PreviewNav({
  contract,
  colorOverride,
  activeIndex = 0,
  items = DEFAULT_ITEMS,
}: PreviewNavProps): React.ReactElement {
  const colors: ColorTokens = colorOverride
    ? { ...contract.color, ...colorOverride }
    : contract.color;

  const { fontFamily, baseFontSize, bodyWeight, headingWeight } = contract.typography;
  const { borderWidth } = contract.shape;
  const binding = contract.componentBinding.nav.md;
  const px = contract.spacing[binding.paddingX];
  const py = contract.spacing[binding.paddingY];
  const gap = contract.spacing[binding.gap];

  const navStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    borderBottom: `${borderWidth}px solid ${colors.border}`,
    display: "flex",
    flexDirection: "row",
    gap: `${gap}px`,
    fontFamily,
    fontSize: `${baseFontSize}px`,
    padding: `0 ${px}px`,
  };

  const activeItemStyle: React.CSSProperties = {
    color: colors.primary,
    fontWeight: headingWeight,
    padding: `${py}px 0`,
    borderBottom: `2px solid ${colors.primary}`,
    cursor: "pointer",
  };

  const inactiveItemStyle: React.CSSProperties = {
    color: colors.textSecondary,
    fontWeight: bodyWeight,
    padding: `${py}px 0`,
    borderBottom: "2px solid transparent",
    cursor: "pointer",
  };

  return (
    <nav style={navStyle} data-testid="preview-nav">
      {items.map((item, i) => (
        <span
          key={item}
          style={i === activeIndex ? activeItemStyle : inactiveItemStyle}
          data-active={i === activeIndex}
        >
          {item}
        </span>
      ))}
    </nav>
  );
}
