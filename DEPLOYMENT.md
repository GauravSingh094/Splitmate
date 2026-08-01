# 🚀 Splito — Production Deployment Guide

This guide details the steps to deploy **Splito** to production environments (Vercel, AWS Amplify, Docker, or Kubernetes).

---

## 📋 Environment Variables

Ensure the following environment variables are set in your production deployment environment:

| Variable | Type | Default / Example | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | String | `https://apiv1.splitmate.page/api/v1` | Base URL for the live FastAPI backend |
| `NODE_ENV` | String | `production` | Enables production optimizations & SW registration |

---

## 📦 Deployment Steps (Vercel Recommended)

1. **Connect Repository**: Import the repository in your Vercel Dashboard.
2. **Framework Preset**: Select **Next.js**.
3. **Environment Variables**: Add `NEXT_PUBLIC_API_URL`.
4. **Deploy**: Vercel automatically runs `pnpm build` and generates the static & dynamic route bundles.

---

## 🐳 Docker Deployment

To deploy using Docker:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
ENV NEXT_PUBLIC_API_URL=https://apiv1.splitmate.page/api/v1
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🔍 Pre-Release Verification Checklist

- [x] All 18 static & dynamic routes compile cleanly (`pnpm build`).
- [x] TypeScript returns 0 errors (`pnpm type-check`).
- [x] ESLint returns 0 errors / 0 warnings (`pnpm lint`).
- [x] Vitest unit test suite passes 100% (`pnpm test`).
- [x] Security headers & CSP configured in `next.config.ts`.
- [x] Service Worker (`sw.js`) and Web App Manifest (`manifest.json`) active.
