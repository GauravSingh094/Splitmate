/**
 * Type-safe Color Tokens
 */

export const COLOR_TOKENS = {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  surface: 'var(--surface)',
  surfaceRaised: 'var(--surface-raised)',
  surfaceOverlay: 'var(--surface-overlay)',
  surfaceInset: 'var(--surface-inset)',

  primary: 'var(--primary)',
  primaryForeground: 'var(--primary-foreground)',

  secondary: 'var(--secondary)',
  secondaryForeground: 'var(--secondary-foreground)',

  accent: 'var(--accent)',
  accentForeground: 'var(--accent-foreground)',

  muted: 'var(--muted)',
  mutedForeground: 'var(--muted-foreground)',

  success: 'var(--success)',
  successForeground: 'var(--success-foreground)',

  warning: 'var(--warning)',
  warningForeground: 'var(--warning-foreground)',

  danger: 'var(--danger)',
  dangerForeground: 'var(--danger-foreground)',

  info: 'var(--info)',
  infoForeground: 'var(--info-foreground)',

  border: 'var(--border)',
  borderMuted: 'var(--border-muted)',
  borderStrong: 'var(--border-strong)',
  borderInteractive: 'var(--border-interactive)',

  input: 'var(--input)',
  ring: 'var(--ring)',

  disabled: 'var(--disabled)',
  disabledForeground: 'var(--disabled-foreground)',

  overlay: 'var(--overlay)',
  selectionBg: 'var(--selection-bg)',
  selectionFg: 'var(--selection-fg)',
  skeleton: 'var(--skeleton)',
} as const;

export type ColorTokenKey = keyof typeof COLOR_TOKENS;
