# 💻 Splito — Developer Guide & Onboarding Manual

Welcome to the **Splito** developer guide. This document provides everything new engineering team members need to clone, set up, develop, test, and deploy features.

---

## 🚀 Quick Setup & Onboarding

### 1. Requirements
- **Node.js**: `v20.x` or higher
- **pnpm**: `v9.x` (`npm install -g pnpm`)

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://apiv1.splitmate.page/api/v1
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Master NPM Command Reference

| Command | Purpose |
|---|---|
| `pnpm dev` | Starts Turbopack development server on port 3000 |
| `pnpm build` | Compiles optimized Next.js production build |
| `pnpm type-check` | Runs TypeScript type checking (`tsc --noEmit`) |
| `pnpm lint` | Runs ESLint with zero-warning threshold |
| `pnpm test` | Runs Vitest unit & component test suite |
| `pnpm test:e2e` | Runs Playwright E2E test suite |
| `pnpm storybook` | Starts Storybook design system UI on port 6006 |
| `pnpm generate:api` | Regenerates TypeScript DTOs from `openapi.json` |
| `pnpm analyze` | Opens interactive bundle visual chunk maps |
