import { logger } from './logger';

class MetricsCollector {
  private apiLatencies: number[] = [];
  private cacheHits = 0;
  private cacheMisses = 0;

  recordApiLatency(endpoint: string, durationMs: number) {
    this.apiLatencies.push(durationMs);
    if (durationMs > 1000) {
      logger.warn(`Slow API Request: ${endpoint} took ${durationMs}ms`);
    }
  }

  recordCacheHit() {
    this.cacheHits++;
  }

  recordCacheMiss() {
    this.cacheMisses++;
  }

  getMetrics() {
    const avgLatency =
      this.apiLatencies.length > 0
        ? Math.round(this.apiLatencies.reduce((a, b) => a + b, 0) / this.apiLatencies.length)
        : 0;

    const totalCacheRequests = this.cacheHits + this.cacheMisses;
    const cacheHitRate =
      totalCacheRequests > 0 ? Math.round((this.cacheHits / totalCacheRequests) * 100) : 100;

    return {
      avgLatencyMs: avgLatency,
      cacheHitRatePercent: cacheHitRate,
      totalCacheHits: this.cacheHits,
      totalCacheMisses: this.cacheMisses,
    };
  }
}

export const metricsCollector = new MetricsCollector();
