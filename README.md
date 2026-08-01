# ⚡ Splito — Enterprise Shared Expense Management Platform

Splito is a world-class, enterprise-grade shared expense splitting and debt settlement application built with Next.js 15, React 19, TypeScript, TanStack Query v5, and Tailwind CSS v4.

---

## 🌟 Key Features & Enterprise Modules

- 🏢 **Enterprise Group Management**: Complete lifecycle, member permissions, tabbed subviews with URL query state persistence (`nuqs`).
- 💸 **Expense Split Engine**: Supports **Equal**, **Exact Amount**, **Percentage**, and **Share Based** split algorithms with live calculations and automatic `Idempotency-Key` generation.
- ⚖️ **Balances & Debt Simplification**: Backend-calculated debt graph (`GET /groups/{id}/balances/simplified`) collapsing multi-party debts into minimum payments.
- 🔔 **Notification Center**: 30s smart polling strategy with slide-out drawer, type badges, and mark-as-read actions.
- 👤 **Profile & System Settings**: Identity details, preferred currency, theme selection (**Light**, **Dark**, **System**), and accessibility preferences.
- 🔍 **Raycast-Style Universal Search**: Instant search across Groups, Expenses, Settlements, and Notifications with pinned Favorites (`⌘K` / `Ctrl+K`).
- 📊 **Observability & Diagnostics**: Provider-agnostic analytics tracker, structured logger, and floating system diagnostics panel.
- 📱 **Installable PWA & Offline Engine**: Service worker caching shell & static assets with one-click native **Install Banner**.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack) & React 19
- **State & Data**: TanStack Query v5, `nuqs` (URL State), Axios
- **Styling**: Tailwind CSS v4, Framer Motion (Motion Engine), Lucide Icons
- **Forms & Validation**: React Hook Form + Zod
- **Testing**: Vitest, React Testing Library, Playwright, MSW
- **Observability**: Custom Structured Logger & Metrics Collector

---

## 🚀 Quick Start

### 1. Installation
```bash
pnpm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://apiv1.splitmate.page/api/v1
```

### 3. Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Code Quality Commands

```bash
# TypeScript Type Checking
pnpm type-check

# ESLint Code Linting
pnpm lint

# Vitest Unit & Component Tests
pnpm test

# Playwright End-to-End Tests
pnpm test:e2e

# Production Build Verification
pnpm build
```
