import { logger } from './logger';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

class AnalyticsManager {
  /**
   * Tracks user interaction events in a provider-agnostic manner.
   */
  trackEvent(eventName: string, properties?: Record<string, unknown>) {
    logger.info(`Analytics Event: ${eventName}`, properties);
  }

  /**
   * Tracks pageview navigation.
   */
  trackPageview(path: string) {
    logger.info(`Pageview: ${path}`);
  }
}

export const analytics = new AnalyticsManager();
