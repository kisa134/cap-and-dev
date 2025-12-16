/**
 * Design Tokens for COGITO.ART v3.0
 * Monochrome palette with accent colors for data visualization
 * Sharp corners, no rounded edges
 */

export const colors = {
  // Monochrome base
  black: '#000000',
  white: '#FFFFFF',

  // Neutral scale
  neutral: {
    900: '#0A0A0A',
    800: '#1A1A1A',
    700: '#2A2A2A',
    600: '#3A3A3A',
    500: '#808080',
    400: '#A0A0A0',
    300: '#C0C0C0',
    200: '#D9D9D9',
    100: '#F0F0F0',
    50: '#F8F8F8',
  },

  // Accent colors (for data, graphs, interactive elements only)
  accent: {
    emerald: {
      500: '#10B981',
      400: '#34D399',
      300: '#6EE7B7',
    },
    cyan: {
      500: '#06B6D4',
      400: '#22D3EE',
      300: '#67E8F9',
    },
    red: {
      500: '#EF4444',
      400: '#F87171',
      300: '#FCA5A5',
    },
  },

  // Background variants
  bg: {
    primary: '#000000',
    secondary: '#050505',
    tertiary: '#0A0A0A',
  },

  // Border colors
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(255, 255, 255, 0.05)',
  },
} as const;

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Consolas, monospace',
  },
  fontSize: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.3em',
  },
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1280px',
} as const;

// Utility function for creating border styles
export const createBorder = (width: number = 1, opacity: number = 0.1) => {
  return `${width}px solid rgba(255, 255, 255, ${opacity})`;
};

// Utility for creating gradient text
export const gradientText = (from: string, to: string) => {
  return {
    background: `linear-gradient(to right, ${from}, ${to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
};
