/**
 * Type-safe Neo-Claymorphism Shadow System Tokens
 */

export const SHADOW_TOKENS = {
  elevation1: 'var(--shadow-elevation-1)',
  elevation2: 'var(--shadow-elevation-2)',
  elevation3: 'var(--shadow-elevation-3)',
  elevation4: 'var(--shadow-elevation-4)',
  inset: 'var(--shadow-inset)',
  focus: 'var(--shadow-focus)',
  hover: 'var(--shadow-hover)',
  pressed: 'var(--shadow-pressed)',
} as const;

export type ShadowTokenKey = keyof typeof SHADOW_TOKENS;
