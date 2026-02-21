// M2 — PreviewCard: surface + elevation + label/value hierarchy from DesignContract

import React from "react";
import type { DesignContract, ColorTokens } from "@contracts/types";

export interface PreviewCardProps {
  contract: DesignContract;
  colorOverride?: Partial<ColorTokens>;
}

export function PreviewCard({
  contract,
  colorOverride,
}: PreviewCardProps): React.ReactElement {
  const colors: ColorTokens = colorOverride
    ? { ...contract.color, ...colorOverride }
    : contract.color;

  const { fontFamily, baseFontSize, bodyWeight } = contract.typography;
  const { radiusMd, borderWidth } = contract.shape;
  const binding = contract.componentBinding.card.md;
  const px = contract.spacing[binding.paddingX];
  const py = contract.spacing[binding.paddingY];
  const gap = contract.spacing[binding.gap];

  const cardStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    boxShadow: contract.elevation.sm,
    borderRadius: `${radiusMd}px`,
    border: `${borderWidth}px solid ${colors.border}`,
    padding: `${py}px ${px}px`,
    fontFamily,
    fontSize: `${baseFontSize}px`,
    fontWeight: bodyWeight,
    display: "flex",
    flexDirection: "column",
    gap: `${gap}px`,
  };

  const labelStyle: React.CSSProperties = {
    color: colors.textSecondary,
    fontSize: `${Math.round(baseFontSize * 0.85)}px`,
  };

  const valueStyle: React.CSSProperties = {
    color: colors.textPrimary,
    fontWeight: contract.typography.headingWeight,
  };

  const rows: Array<{ label: string; value: string }> = [
    { label: "Theme", value: contract.name },
    { label: "Font", value: contract.typography.fontFamily.split(",")[0].replace(/'/g, "") },
    { label: "Radius", value: `${radiusMd}px` },
  ];

  return (
    <div style={cardStyle} data-testid="preview-card">
      {rows.map(({ label, value }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={labelStyle}>{label}</span>
          <span style={valueStyle}>{value}</span>
        </div>
      ))}
    </div>
  );
}
