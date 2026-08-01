/**
 * Type-safe Typography Tokens & Utility Class Maps
 */

export const TYPOGRAPHY_VARIANTS = {
  displayXl: 'text-5xl font-bold tracking-tighter leading-none md:text-6xl',
  display: 'text-4xl font-bold tracking-tight leading-tight md:text-5xl',
  headingXl: 'text-3xl font-bold tracking-tight leading-snug md:text-4xl',
  heading: 'text-2xl font-semibold tracking-tight leading-snug md:text-3xl',
  headingSm: 'text-xl font-semibold tracking-tight leading-snug',
  title: 'text-lg font-semibold tracking-normal leading-normal',
  subtitle: 'text-base font-medium text-muted-foreground leading-normal',
  bodyLg: 'text-lg font-normal leading-relaxed',
  body: 'text-base font-normal leading-normal',
  small: 'text-sm font-normal leading-normal',
  caption: 'text-xs font-normal text-muted-foreground leading-normal',
  label: 'text-xs font-medium uppercase tracking-wider text-muted-foreground',
  code: 'font-mono text-sm font-medium',
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;
