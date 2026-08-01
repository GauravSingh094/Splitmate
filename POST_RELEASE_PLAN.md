# 📋 Splito — Post-Release Operations & Phase 4 Plan

This document outlines post-release operational monitoring, error tracking, hotfix workflows, and future Phase 4 roadmap items for **Splito v1.0.0**.

---

## 📈 1. Operational Monitoring & Observability

- **Application Performance Monitoring**: Track Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) in production runtimes.
- **Error Tracking**: Capture unhandled client exceptions via Sentry with sanitized stack traces (no JWT tokens or user PII logged).
- **Network API Health**: Monitor `https://apiv1.splitmate.page/api/v1` response latency and 5xx error rates.

---

## 🚨 2. Hotfix Workflow (`v1.0.1`)

1. Branch from `main`: `git checkout -b fix/issue-description`
2. Implement targeted fix adhering to `ENGINEERING_STANDARDS.md`.
3. Verify quality gates: `pnpm type-check`, `pnpm lint`, `pnpm test`, `pnpm build`.
4. Submit PR with `.github/PULL_REQUEST_TEMPLATE.md`.
5. Merge and tag patch release: `v1.0.1`.

---

## 🗺️ 3. Phase 4 Roadmap Candidates

- **Advanced Analytics Dashboard**: Multi-currency exchange rate conversion graphs.
- **OCR Receipt Scanning**: Automated line-item extraction from uploaded expense receipts.
- **Group Activity Live Feed**: Real-time WebSocket notifications for instant balance updates.
