/**
 * Feature flag registry.
 *
 * Feature flags gate unreleased or experimental functionality.
 * Controls whether backend-dependent modules render live data or
 * the future-ready "Coming Soon" experience.
 */
export const FEATURE_FLAGS = {
  /** AI-powered expense categorisation and split suggestions. */
  AI_SUGGESTIONS: process.env['NEXT_PUBLIC_FF_AI_SUGGESTIONS'] === 'true',

  /** Camera-based receipt scanning and parsing. */
  RECEIPT_SCANNING: process.env['NEXT_PUBLIC_FF_RECEIPT_SCANNING'] === 'true',

  /** Advanced analytics dashboard with trend charts. */
  ANALYTICS: process.env['NEXT_PUBLIC_FF_ANALYTICS'] === 'true',

  /** Push and email notifications engine. */
  NOTIFICATIONS: process.env['NEXT_PUBLIC_FF_NOTIFICATIONS'] === 'true',

  /** Audit activity feed. */
  ACTIVITY_FEED: process.env['NEXT_PUBLIC_FF_ACTIVITY_FEED'] === 'true',

  /** PDF/CSV financial exports & reports. */
  FUTURE_REPORTS: process.env['NEXT_PUBLIC_FF_FUTURE_REPORTS'] === 'true',

  /** Multi-currency support with live exchange rates. */
  MULTI_CURRENCY: process.env['NEXT_PUBLIC_FF_MULTI_CURRENCY'] === 'true',
} as const;

export type FeatureFlags = typeof FEATURE_FLAGS;
export type FeatureFlagKey = keyof FeatureFlags;

/**
 * Check if a feature flag is enabled.
 */
export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return FEATURE_FLAGS[flag] ?? false;
}
