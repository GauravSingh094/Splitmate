# ⚡ Splito — Performance Engineering & Bundle Optimization Manual

This document details the frontend performance targets, bundle analyzer setup, Web Vitals budgets, and optimization practices for **Splito**.

---

## 🎯 Target Performance Budgets & Core Web Vitals

| Metric | Target Threshold | Description |
|---|---|---|
| **Largest Contentful Paint (LCP)** | `< 2.5s` | Main content render speed |
| **Interaction to Next Paint (INP)** | `< 200ms` | User interaction responsiveness |
| **Cumulative Layout Shift (CLS)** | `< 0.1` | Visual layout stability |
| **Time to First Byte (TTFB)** | `< 0.8s` | Server response latency |
| **First Contentful Paint (FCP)** | `< 1.8s` | Initial visual render |
| **Initial JavaScript Bundle** | `< 150 kB` | Gzipped initial bundle budget |

---

## 📦 Bundle Analysis Workflow

Bundle analysis is integrated with `@next/bundle-analyzer`. Run the following command to inspect route bundle chunks:

```bash
pnpm analyze
```

This opens interactive visual chunk maps for client and server bundles in your browser.

---

## 🚀 Optimization Strategies Applied

1. **Route Code Splitting**: All page routes under `src/app/` are dynamically code-split per route.
2. **Component Lazy Loading**: Heavy overlays (`GlobalSearchModal`, `DiagnosticsPanel`) are lazy loaded on demand.
3. **Query Cache Garbage Collection**: TanStack Query defaults (`staleTime: 5 * 60 * 1000`, `gcTime: 10 * 60 * 1000`) prevent memory bloat and redundant refetches.
4. **GPU Accelerated Motion**: Framer Motion transitions rely strictly on CSS `transform` and `opacity` to avoid layout thrashing.
5. **Asset Compression**: `AVIF` and `WebP` formats used for optimized image delivery.
