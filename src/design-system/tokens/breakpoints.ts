/**
 * Type-safe Responsive Breakpoint & Container Width Tokens
 */

export const BREAKPOINT_TOKENS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const CONTAINER_TOKENS = {
  sm: 'var(--container-sm)',
  md: 'var(--container-md)',
  lg: 'var(--container-lg)',
  xl: 'var(--container-xl)',
  '2xl': 'var(--container-2xl)',
  page: 'var(--container-page)',
  content: 'var(--container-content)',
} as const;

export type BreakpointKey = keyof typeof BREAKPOINT_TOKENS;
