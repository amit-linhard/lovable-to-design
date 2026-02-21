// Design Contract Hub — 4px base spacing scale
// M1: Foundation & Data Model

import type { SpacingScale, ComponentBinding } from "./types";

/** All spacing derived from a 4px base unit */
export const BASE_UNIT = 4;

export const spacing: SpacingScale = {
  xs: BASE_UNIT * 1,    // 4px
  sm: BASE_UNIT * 2,    // 8px
  smMd: BASE_UNIT * 3,  // 12px
  md: BASE_UNIT * 4,    // 16px
  mdLg: BASE_UNIT * 5,  // 20px
  lg: BASE_UNIT * 6,    // 24px
  xl: BASE_UNIT * 8,    // 32px
  xxl: BASE_UNIT * 10,  // 40px
  xxxl: BASE_UNIT * 12, // 48px
  xxxxl: BASE_UNIT * 16,// 64px
};

/** Convert a SpacingScale key to its pixel value */
export function px(step: keyof SpacingScale): number {
  return spacing[step];
}

/** Default component spacing bindings (sm/md/lg → spacing step names) */
export const defaultComponentBinding: ComponentBinding = {
  button: {
    sm: { paddingX: "sm",   paddingY: "xs",   gap: "xs"   },
    md: { paddingX: "md",   paddingY: "sm",   gap: "sm"   },
    lg: { paddingX: "lg",   paddingY: "smMd", gap: "sm"   },
  },
  card: {
    sm: { paddingX: "sm",   paddingY: "sm",   gap: "sm"   },
    md: { paddingX: "md",   paddingY: "md",   gap: "smMd" },
    lg: { paddingX: "lg",   paddingY: "lg",   gap: "md"   },
  },
  input: {
    sm: { paddingX: "sm",   paddingY: "xs",   gap: "xs"   },
    md: { paddingX: "smMd", paddingY: "sm",   gap: "sm"   },
    lg: { paddingX: "md",   paddingY: "smMd", gap: "sm"   },
  },
  nav: {
    sm: { paddingX: "smMd", paddingY: "xs",   gap: "sm"   },
    md: { paddingX: "md",   paddingY: "sm",   gap: "md"   },
    lg: { paddingX: "lg",   paddingY: "smMd", gap: "lg"   },
  },
};
