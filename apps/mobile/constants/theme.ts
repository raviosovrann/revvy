export const colors = {
  // Background
  bg: '#000000',
  surface: '#0f0f10',
  surfaceLight: '#1c1c1e',

  // Text
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',

  // Brand
  blue: '#3b82f6',
  blueDark: '#2563eb',
  blueLight: '#60a5fa',
  purple: '#8b5cf6',
  purpleDark: '#7c3aed',
  purpleLight: '#a78bfa',

  // Primary action (blue = stability/dependability)
  accent: '#3b82f6',
  accentDark: '#2563eb',
  accentLight: '#60a5fa',

  // Secondary highlight (purple = wisdom/luxury/creativity)
  secondary: '#8b5cf6',
  secondaryDark: '#7c3aed',
  secondaryLight: '#a78bfa',

  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Neutrals
  neutral100: '#f1f5f9',
  neutral200: '#e2e8f0',
  neutral300: '#cbd5e1',
  neutral400: '#94a3b8',
  neutral500: '#64748b',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1e293b',
  neutral900: '#0f172a',

  // Divider
  divider: '#27272a',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  heading: {
    fontFamily: 'System',
    fontWeight: '800' as const,
  },
  body: {
    fontFamily: 'System',
  },
  size: {
    xs: 10,
    sm: 12,
    md: 13,
    base: 14,
    lg: 15,
    xl: 16,
    '2xl': 17,
    '3xl': 19,
    '4xl': 21,
    '5xl': 28,
    '6xl': 34,
  },
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
