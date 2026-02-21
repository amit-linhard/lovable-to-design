// M2 — Tests for PreviewButton, PreviewCard, PaletteStrip
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
afterEach(cleanup);

import { cleanPro, warmEditorial } from "@contracts/themes";
import { PreviewButton } from "./PreviewButton";
import { PreviewCard } from "./PreviewCard";
import { PaletteStrip } from "./PaletteStrip";

// ─── PreviewButton ────────────────────────────────────────────────────────────

describe("PreviewButton", () => {
  it("renders without error", () => {
    const { container } = render(<PreviewButton contract={cleanPro} />);
    expect(container.querySelector("button")).toBeTruthy();
  });

  it("primary variant has contract primary color as background", () => {
    render(<PreviewButton contract={cleanPro} variant="primary" label="Primary" />);
    const btn = screen.getByText("Primary");
    expect(btn).toHaveStyle({ backgroundColor: cleanPro.color.primary });
  });

  it("ghost variant has transparent background", () => {
    const { container } = render(<PreviewButton contract={cleanPro} variant="ghost" label="Ghost" />);
    const btn = container.querySelector("button")!;
    // inline style is "transparent"; jsdom computed style normalizes to rgba(0,0,0,0)
    expect(btn.style.backgroundColor).toBe("transparent");
  });

  it("ghost variant border color matches contract primary", () => {
    const { container } = render(<PreviewButton contract={cleanPro} variant="ghost" label="Ghost" />);
    const btn = container.querySelector("button")!;
    expect(btn).toHaveStyle({
      border: `${cleanPro.shape.borderWidth}px solid ${cleanPro.color.primary}`,
    });
  });

  it("applies contract font-family", () => {
    render(<PreviewButton contract={cleanPro} label="Font" />);
    const btn = screen.getByText("Font");
    expect(btn).toHaveStyle({ fontFamily: cleanPro.typography.fontFamily });
  });

  it("applies contract border-radius from shape.radiusSm", () => {
    render(<PreviewButton contract={cleanPro} label="Radius" />);
    const btn = screen.getByText("Radius");
    expect(btn).toHaveStyle({ borderRadius: `${cleanPro.shape.radiusSm}px` });
  });

  it("colorOverride changes primary color", () => {
    render(
      <PreviewButton
        contract={cleanPro}
        variant="primary"
        label="Override"
        colorOverride={{ primary: "#FF0000" }}
      />
    );
    const btn = screen.getByText("Override");
    expect(btn).toHaveStyle({ backgroundColor: "#FF0000" });
  });

  it("looks visually different with warmEditorial vs cleanPro", () => {
    const { container: a } = render(<PreviewButton contract={cleanPro} />);
    const { container: b } = render(<PreviewButton contract={warmEditorial} />);
    const btnA = a.querySelector("button")!;
    const btnB = b.querySelector("button")!;
    expect(btnA.style.fontFamily).not.toBe(btnB.style.fontFamily);
  });
});

// ─── PreviewCard ──────────────────────────────────────────────────────────────

describe("PreviewCard", () => {
  it("renders without error", () => {
    render(<PreviewCard contract={cleanPro} />);
    expect(screen.getByTestId("preview-card")).toBeTruthy();
  });

  it("has surface color as background", () => {
    render(<PreviewCard contract={cleanPro} />);
    expect(screen.getByTestId("preview-card")).toHaveStyle({
      backgroundColor: cleanPro.color.surface,
    });
  });

  it("has box-shadow from contract.elevation.sm", () => {
    render(<PreviewCard contract={cleanPro} />);
    expect(screen.getByTestId("preview-card")).toHaveStyle({
      boxShadow: cleanPro.elevation.sm,
    });
  });

  it("has border-radius from contract.shape.radiusMd", () => {
    render(<PreviewCard contract={cleanPro} />);
    expect(screen.getByTestId("preview-card")).toHaveStyle({
      borderRadius: `${cleanPro.shape.radiusMd}px`,
    });
  });

  it("shows contract name as a value", () => {
    render(<PreviewCard contract={cleanPro} />);
    expect(screen.getByText(cleanPro.name)).toBeTruthy();
  });

  it("colorOverride changes surface background", () => {
    const { container } = render(<PreviewCard contract={cleanPro} colorOverride={{ surface: "#ABCDEF" }} />);
    const card = container.querySelector("[data-testid='preview-card']")!;
    expect(card).toHaveStyle({ backgroundColor: "#ABCDEF" });
  });

  it("looks different with warmEditorial vs cleanPro", () => {
    const { container: a } = render(<PreviewCard contract={cleanPro} />);
    const { container: b } = render(<PreviewCard contract={warmEditorial} />);
    const cardA = a.querySelector("[data-testid='preview-card']")! as HTMLElement;
    const cardB = b.querySelector("[data-testid='preview-card']")! as HTMLElement;
    expect(cardA.style.fontFamily).not.toBe(cardB.style.fontFamily);
  });
});

// ─── PaletteStrip ─────────────────────────────────────────────────────────────

describe("PaletteStrip", () => {
  it("renders without error", () => {
    render(<PaletteStrip colors={cleanPro.color} size="md" />);
    expect(screen.getByTestId("palette-strip")).toBeTruthy();
  });

  it("renders 9 color swatches (one per ColorTokens key)", () => {
    const { container } = render(<PaletteStrip colors={cleanPro.color} size="md" />);
    const swatches = container.querySelectorAll("[data-color-key]");
    expect(swatches).toHaveLength(9);
  });

  it("renders all 9 color keys", () => {
    const { container } = render(<PaletteStrip colors={cleanPro.color} size="md" />);
    const keys = Array.from(container.querySelectorAll("[data-color-key]")).map(
      (el) => el.getAttribute("data-color-key")
    );
    expect(keys).toContain("primary");
    expect(keys).toContain("accent");
    expect(keys).toContain("background");
    expect(keys).toContain("focusRing");
  });

  it("each swatch has the correct background color from contract", () => {
    const { container } = render(<PaletteStrip colors={cleanPro.color} size="md" />);
    const accentSwatch = container.querySelector("[data-color-key='accent'] [data-color-value]");
    expect(accentSwatch).toHaveStyle({ backgroundColor: cleanPro.color.accent });
  });

  it("renders correctly at sm size", () => {
    const { container } = render(<PaletteStrip colors={cleanPro.color} size="sm" />);
    const swatches = container.querySelectorAll("[data-color-key]");
    expect(swatches).toHaveLength(9);
  });

  it("colorOverride accent is reflected in swatch color", () => {
    const overriddenColors = { ...cleanPro.color, accent: "#FF0000" };
    const { container } = render(<PaletteStrip colors={overriddenColors} size="md" />);
    const accentSwatch = container.querySelector("[data-color-key='accent'] [data-color-value]");
    expect(accentSwatch).toHaveStyle({ backgroundColor: "#FF0000" });
  });
});
