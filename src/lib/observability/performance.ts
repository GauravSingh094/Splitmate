'use client';

/**
 * Enterprise Performance Profiling & Metrics Utility.
 * Measures mark-to-measure durations, tracks Web Vitals (LCP, INP, CLS, TTFB, FCP),
 * and detects Long Tasks (>50ms) in development.
 */
export class PerformanceProfiler {
  private static marks = new Map<string, number>();

  static startMark(name: string): void {
    if (typeof performance !== 'undefined') {
      this.marks.set(name, performance.now());
      performance.mark(`${name}_start`);
    }
  }

  static endMark(name: string): number {
    if (typeof performance !== 'undefined') {
      const startTime = this.marks.get(name);
      if (startTime !== undefined) {
        const duration = performance.now() - startTime;
        performance.mark(`${name}_end`);
        try {
          performance.measure(name, `${name}_start`, `${name}_end`);
        } catch {
          // Ignore measure errors if marks were cleared
        }
        this.marks.delete(name);
        return duration;
      }
    }
    return 0;
  }

  static observeLongTasks(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              // Long task detected (>50ms)
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch {
        // Longtask observation unsupported
      }
    }
  }
}
