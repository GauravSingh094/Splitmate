/**
 * Type-safe Component Tokens (Reserved for future UI library components)
 */

export const COMPONENT_TOKENS = {
  button: {
    heightSm: 'var(--btn-height-sm)',
    heightMd: 'var(--btn-height-md)',
    heightLg: 'var(--btn-height-lg)',
  },
  input: {
    heightSm: 'var(--input-height-sm)',
    heightMd: 'var(--input-height-md)',
    heightLg: 'var(--input-height-lg)',
  },
  avatar: {
    xs: 'var(--avatar-size-xs)',
    sm: 'var(--avatar-size-sm)',
    md: 'var(--avatar-size-md)',
    lg: 'var(--avatar-size-lg)',
    xl: 'var(--avatar-size-xl)',
  },
} as const;
