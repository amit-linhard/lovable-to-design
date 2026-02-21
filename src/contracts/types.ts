// Design Contract Hub — core type definitions
// M1: Foundation & Data Model

// ─── Color ───────────────────────────────────────────────────────────────────

export interface ColorTokens {
  /** Primary brand / interactive color */
  primary: string;
  /** Secondary / supporting color */
  secondary: string;
  /** Accent — one tone the user may override (brand color slot) */
  accent: string;
  /** Page / app background */
  background: string;
  /** Card / surface background */
  surface: string;
  /** High-emphasis text */
  textPrimary: string;
  /** Mid-emphasis text */
  textSecondary: string;
  /** Borders and dividers */
  border: string;
  /** Focused input ring */
  focusRing: string;
}

// ─── Typography ──────────────────────────────────────────────────────────────

export type FontWeight = 400 | 500 | 600 | 700;

export interface TypographyTokens {
  /** Font family stack for all UI text */
  fontFamily: string;
  /** Base body font size (px) */
  baseFontSize: number;
  /** Scale ratio between type steps */
  scaleRatio: number;
  /** Default body font weight */
  bodyWeight: FontWeight;
  /** Heading font weight */
  headingWeight: FontWeight;
  /** Letter spacing for headings (em) */
  headingLetterSpacing: number;
  /** Line height for body text */
  bodyLineHeight: number;
}

// ─── Shape ───────────────────────────────────────────────────────────────────

export interface ShapeTokens {
  /** Border radius for small components (px) — buttons, badges */
  radiusSm: number;
  /** Border radius for medium components (px) — inputs, cards */
  radiusMd: number;
  /** Border radius for large surfaces (px) — modals, panels */
  radiusLg: number;
  /** Default border width (px) */
  borderWidth: number;
  /** Focus ring width (px) */
  focusRingWidth: number;
  /** Focus ring offset (px) */
  focusRingOffset: number;
}

// ─── Spacing ─────────────────────────────────────────────────────────────────

/** Named spacing steps derived from the 4px base scale */
export interface SpacingScale {
  /** 4px */
  xs: number;
  /** 8px */
  sm: number;
  /** 12px */
  smMd: number;
  /** 16px */
  md: number;
  /** 20px */
  mdLg: number;
  /** 24px */
  lg: number;
  /** 32px */
  xl: number;
  /** 40px */
  xxl: number;
  /** 48px */
  xxxl: number;
  /** 64px */
  xxxxl: number;
}

/** T-shirt size binding from component size to spacing step names */
export type ComponentSize = "sm" | "md" | "lg";

export interface ComponentSpacingBinding {
  paddingX: keyof SpacingScale;
  paddingY: keyof SpacingScale;
  gap: keyof SpacingScale;
}

export type ComponentBindingMap = Record<ComponentSize, ComponentSpacingBinding>;

// ─── Component Binding ───────────────────────────────────────────────────────

/**
 * Maps each canonical component to its spacing binding so tokens can be
 * applied uniformly without per-component hardcoding.
 */
export interface ComponentBinding {
  button: ComponentBindingMap;
  card: ComponentBindingMap;
  input: ComponentBindingMap;
  nav: ComponentBindingMap;
}

// ─── Export Config ───────────────────────────────────────────────────────────

export type ExportFormat = "tailwind" | "css-vars" | "shadcn";

export interface ExportConfig {
  format: ExportFormat;
  /** Filename hint for download (without extension) */
  filename: string;
}

// ─── Design Contract (root) ──────────────────────────────────────────────────

export interface DesignContract {
  /** Unique identifier for the theme */
  id: string;
  /** Display name shown in browse grid */
  name: string;
  /** Short personality descriptor */
  description: string;
  color: ColorTokens;
  typography: TypographyTokens;
  shape: ShapeTokens;
  spacing: SpacingScale;
  componentBinding: ComponentBinding;
}
