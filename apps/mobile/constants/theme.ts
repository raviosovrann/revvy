export const colors = {
  // Background
  bg: '#1a1a2e',
  surface: '#2a2a3e',
  surfaceLight: '#3a3a4e',

  // Text
  text: '#ffffff',
  textSecondary: '#a0a0b0',
  textMuted: '#6b6b7b',

  // Brand
  accent: '#4f46e5',
  accentDark: '#3730a3',
  accentLight: '#818cf8',

  // Semantic
  success: '#10b981',
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
  divider: '#3a3a4e',
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
