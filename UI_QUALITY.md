# 🛡️ Splito — UI Quality & Visual Regression Platform

This document describes the automated visual regression testing workflow, accessibility auditing rules, responsive viewport specifications, and visual quality controls for **Splito**.

---

## 📸 Visual Regression & Snapshot Testing

Visual testing is powered by **Playwright** (`e2e/ui-quality.spec.ts`) and **Storybook**. Screenshot baselines verify that production component rendering remains visually identical across builds.

### Generating / Updating Baselines

To update screenshot baselines after intentional UI design changes:

```bash
npx playwright test --update-snapshots
```

---

## ♿ Automated Accessibility Audits (Axe-Core)

Automated WCAG 2.1 AA accessibility scans run during E2E test execution using `@axe-core/playwright`.

Scanned Rules:
- **Color Contrast**: Enforces high contrast standard for text and icons.
- **ARIA Labeling**: Validates interactive elements (`button`, `input`, `dialog`).
- **Focus Order & Rings**: Ensures visible keyboard focus indicators.
- **Touch Target Sizes**: Minimum 44x44px touch targets on mobile viewports.

---

## 📱 Responsive Viewport Grid

All core components and pages are validated across 3 standard viewports:

1. **Mobile**: `375px x 667px`
2. **Tablet**: `768px x 1024px`
3. **Desktop**: `1440px x 900px`
