/**
 * Design System Constants
 * Centralized design tokens for consistent UI across the application
 */

// Color Palette
export const colors = {
  // Primary colors
  primary: {
    50: "rgb(239 246 255)",
    100: "rgb(219 234 254)",
    200: "rgb(191 219 254)",
    300: "rgb(147 197 253)",
    400: "rgb(96 165 250)",
    500: "rgb(59 130 246)",
    600: "rgb(37 99 235)",
    700: "rgb(29 78 216)",
    800: "rgb(30 64 175)",
    900: "rgb(30 58 138)",
  },
  // Status colors
  success: {
    light: "rgb(134 239 172)",
    DEFAULT: "rgb(34 197 94)",
    dark: "rgb(21 128 61)",
  },
  warning: {
    light: "rgb(253 224 71)",
    DEFAULT: "rgb(234 179 8)",
    dark: "rgb(161 98 7)",
  },
  error: {
    light: "rgb(252 165 165)",
    DEFAULT: "rgb(239 68 68)",
    dark: "rgb(185 28 28)",
  },
  // Neutral grays
  gray: {
    50: "rgb(249 250 251)",
    100: "rgb(243 244 246)",
    200: "rgb(229 231 235)",
    300: "rgb(209 213 219)",
    400: "rgb(156 163 175)",
    500: "rgb(107 114 128)",
    600: "rgb(75 85 99)",
    700: "rgb(55 65 81)",
    800: "rgb(31 41 55)",
    900: "rgb(17 24 39)",
  },
};

// Typography Scale
export const typography = {
  // Font families
  fonts: {
    sans: 'var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  // Font sizes
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },
  // Font weights
  weights: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  // Line heights
  leading: {
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
};

// Spacing Scale (based on 4px grid)
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
};

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
};

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Z-index scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Transitions
export const transitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
};

// Component-specific variants
export const componentVariants = {
  button: {
    sizes: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    },
    variants: {
      primary: "bg-neon/90 text-background hover:bg-neon focus:ring-neon shadow-sm",
      secondary:
        "bg-card text-foreground border border-border hover:bg-card/80 focus:ring-neon",
      success: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      outline:
        "bg-transparent border-2 border-border text-foreground hover:bg-card focus:ring-neon",
      ghost: "bg-transparent text-foreground hover:bg-card/50 focus:ring-neon",
    },
  },
  badge: {
    sizes: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-sm",
      lg: "px-3 py-1 text-base",
    },
    variants: {
      Easy: "bg-green-900/30 text-green-400 border-green-800 font-semibold",
      Medium: "bg-yellow-900/30 text-yellow-400 border-yellow-800 font-semibold",
      Hard: "bg-red-900/30 text-red-400 border-red-800 font-semibold",
      default: "bg-card/50 text-foreground/80 border-border",
      primary: "bg-neon/10 text-neon border-neon/30",
      success: "bg-blue-900/30 text-blue-400 border-blue-800 font-semibold",
      warning: "bg-yellow-900/30 text-yellow-400 border-yellow-800 font-semibold",
      danger: "bg-red-900/30 text-red-400 border-red-800 font-semibold",
    },
  },
  card: {
    variants: {
      default: "bg-card border border-border shadow-sm",
      elevated: "bg-card shadow-lg border border-border/50",
      outlined: "bg-card border-2 border-border",
      ghost: "bg-transparent",
    },
  },
};
