/**
 * Type-safe Motion & Animation Curve Tokens
 */

export const MOTION_TOKENS = {
  duration: {
    fastest: 'var(--motion-duration-fastest)',
    fast: 'var(--motion-duration-fast)',
    normal: 'var(--motion-duration-normal)',
    slow: 'var(--motion-duration-slow)',
    slowest: 'var(--motion-duration-slowest)',
  },
  easing: {
    standard: 'var(--motion-ease-standard)',
    entrance: 'var(--motion-ease-entrance)',
    exit: 'var(--motion-ease-exit)',
    bounce: 'var(--motion-ease-bounce)',
    spring: 'var(--motion-ease-spring)',
    accelerate: 'var(--motion-ease-accelerate)',
    decelerate: 'var(--motion-ease-decelerate)',
  },
  presetTransitions: {
    fast: 'var(--transition-fast)',
    normal: 'var(--transition-normal)',
    smooth: 'var(--transition-smooth)',
  },
} as const;
