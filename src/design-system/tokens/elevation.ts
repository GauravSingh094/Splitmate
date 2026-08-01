/**
 * Type-safe Elevation Z-Index Tokens
 */

export const ELEVATION_TOKENS = {
  deep: 'var(--z-index-deep)',
  base: 'var(--z-index-base)',
  surface: 'var(--z-index-surface)',
  raised: 'var(--z-index-raised)',
  dropdown: 'var(--z-index-dropdown)',
  sticky: 'var(--z-index-sticky)',
  floating: 'var(--z-index-floating)',
  navigation: 'var(--z-index-navigation)',
  popover: 'var(--z-index-popover)',
  drawer: 'var(--z-index-drawer)',
  overlay: 'var(--z-index-overlay)',
  modal: 'var(--z-index-modal)',
  tooltip: 'var(--z-index-tooltip)',
  toast: 'var(--z-index-toast)',
  max: 'var(--z-index-max)',
} as const;

export type ElevationTokenKey = keyof typeof ELEVATION_TOKENS;
