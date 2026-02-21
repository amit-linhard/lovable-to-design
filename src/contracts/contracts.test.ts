// M1 smoke tests — verify types parse and theme data structure is valid
import { describe, it, expect } from "vitest";
import { spacing, defaultComponentBinding } from "./spacing";
import { themes, getTheme } from "./themes";
import type { DesignContract, ExportConfig, ExportFormat } from "./types";

describe("spacing scale", () => {
  it("xs is 4px", () => expect(spacing.xs).toBe(4));
  it("sm is 8px", () => expect(spacing.sm).toBe(8));
  it("md is 16px", () => expect(spacing.md).toBe(16));
  it("lg is 24px", () => expect(spacing.lg).toBe(24));
  it("xxl is 40px", () => expect(spacing.xxl).toBe(40));
  it("xxxxl is 64px", () => expect(spacing.xxxxl).toBe(64));
});

describe("component binding map", () => {
  const components = ["button", "card", "input", "nav"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  components.forEach((comp) => {
    sizes.forEach((size) => {
      it(`${comp}.${size} has paddingX, paddingY, gap keys`, () => {
        const binding = defaultComponentBinding[comp][size];
        expect(binding).toHaveProperty("paddingX");
        expect(binding).toHaveProperty("paddingY");
        expect(binding).toHaveProperty("gap");
        // values are valid SpacingScale keys
        expect(spacing).toHaveProperty(binding.paddingX);
        expect(spacing).toHaveProperty(binding.paddingY);
        expect(spacing).toHaveProperty(binding.gap);
      });
    });
  });
});

describe("theme registry", () => {
  it("has exactly 4 themes", () => expect(themes).toHaveLength(4));

  const expectedIds = ["clean-pro", "warm-editorial", "dense-data", "soft-product"];

  expectedIds.forEach((id) => {
    it(`theme "${id}" is retrievable and has valid contract shape`, () => {
      const theme = getTheme(id);
      expect(theme).toBeDefined();

      // Structural checks against DesignContract
      const t = theme as DesignContract;
      expect(typeof t.id).toBe("string");
      expect(typeof t.name).toBe("string");
      expect(typeof t.description).toBe("string");

      // Color
      const colorKeys: (keyof DesignContract["color"])[] = [
        "primary","secondary","accent","background","surface",
        "textPrimary","textSecondary","border","focusRing",
      ];
      colorKeys.forEach((k) => expect(typeof t.color[k]).toBe("string"));

      // Typography
      expect(typeof t.typography.fontFamily).toBe("string");
      expect(typeof t.typography.baseFontSize).toBe("number");

      // Shape
      expect(typeof t.shape.radiusSm).toBe("number");
      expect(typeof t.shape.radiusMd).toBe("number");

      // Spacing — spot check
      expect(t.spacing.xs).toBe(4);
      expect(t.spacing.md).toBe(16);

      // Component binding
      expect(t.componentBinding.button.md).toHaveProperty("paddingX");
    });
  });
});

describe("ExportConfig type", () => {
  it("accepts valid export formats", () => {
    const formats: ExportFormat[] = ["tailwind", "css-vars", "shadcn"];
    formats.forEach((format) => {
      const config: ExportConfig = { format, filename: "theme" };
      expect(config.format).toBe(format);
    });
  });
});
