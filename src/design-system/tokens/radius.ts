/**
 * Type-safe Border Radius Tokens
 */

export const RADIUS_TOKENS = {
  xs: 'var(--radius-xs)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  '3xl': 'var(--radius-3xl)',
  pill: 'var(--radius-pill)',
  circle: 'var(--radius-circle)',
} as const;

export type RadiusTokenKey = keyof typeof RADIUS_TOKENS;
