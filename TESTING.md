# 🧪 Splito — Testing & Quality Assurance Manual

This guide describes the automated testing stack, unit testing, component testing, end-to-end specifications, accessibility audits, and Storybook visual checks for **Splito**.

---

## 🧰 Testing Stack Overview

- **Unit & Component Testing**: Vitest + React Testing Library + `@testing-library/jest-dom`
- **End-to-End Testing**: Playwright
- **Accessibility Scanning**: `@axe-core/playwright` + `@storybook/addon-a11y`
- **Design System Documentation**: Storybook 8/10 (`pnpm storybook`)

---

## 🏃 Running Tests

```bash
# Run Vitest unit & component test suite
pnpm test

# Run Playwright end-to-end specs
pnpm test:e2e

# Run TypeScript type check
pnpm type-check

# Run ESLint code quality scan
pnpm lint
```
