# Splito — Enterprise UI Platform & Foundation Architecture

This document serves as the authoritative source of truth for the frontend architecture, design system, component composition rules, and layout system of **Splito**.

---

## 1. Application Shell Foundation (`src/layouts/`)

All top-level application pages must be rendered within one of the three primary shell architectures:

1. **`DashboardShell`** (`src/layouts/dashboard-shell/`):
   - Used for all authenticated application routes (`(dashboard)`).
   - Features responsive sidebar collapse/expand, sticky backdrop-blurred header, skip-navigation link, and main content area.
2. **`MarketingShell`** (`src/layouts/marketing-shell/`):
   - Used for public landing pages (`(marketing)`).
3. **`AuthShell`** (`src/layouts/auth-shell/`):
   - Used for centered authentication and onboarding flows (`(auth)`).

---

## 2. Workspace & Page Composition Rules (`src/components/workspace/` & `src/components/page-composition/`)

To maintain visual consistency and prevent arbitrary spacing, **every page must consume the Workspace or Page Composition primitives**:

```tsx
import { Workspace, WorkspaceHeader, WorkspaceBody, WorkspaceContent, WorkspaceSidebar } from '@/components/workspace';

export default function ExamplePage() {
  return (
    <Workspace>
      <WorkspaceHeader>
        <h1 className="text-2xl font-bold">Groups</h1>
      </WorkspaceHeader>
      <WorkspaceBody>
        <WorkspaceContent>
          {/* Main content grid or list */}
        </WorkspaceContent>
        <WorkspaceSidebar>
          {/* Contextual filters or actions */}
        </WorkspaceSidebar>
      </WorkspaceBody>
    </Workspace>
  );
}
```

### Page Layout Primitives
- **`DashboardPage`**: Full-width container with standard 24px gap.
- **`SettingsPage`**: Max-width `max-w-4xl` centered container.
- **`ContentPage`**: Max-width `max-w-3xl` reading layout.
- **`TwoColumnLayout`** & **`ThreeColumnLayout`**: Grid compositions.
- **`StickySidebarLayout`**: Responsive flex layout with sticky sidebar positioning on desktop.

---

## 3. Neo-Claymorphism Design System Tokens (`src/styles/tokens/`)

- **Soft Matte Surfaces**: `bg-surface`, `bg-surface-raised`, `bg-surface-inset`.
- **Dual-Shadow System**: `shadow-neo-1`, `shadow-neo-2`, `shadow-neo-3`, `shadow-neo-4`, `shadow-neo-inset`.
- **8pt Spacing Grid**: `space-0` (0px) to `space-32` (128px).
- **Border Radius**: Soft geometry (`radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-2xl`, `radius-pill`).

> **Rule**: Never hardcode hex values, pixels, or inline box-shadows. Always consume design tokens.

---

## 4. Motion Architecture (`src/motion/`)

All Framer Motion animations use physics presets defined in `src/motion/presets/`:
- **`SPRINGS.snappy`**: `{ type: 'spring', stiffness: 600, damping: 35 }` (Buttons, toggles).
- **`SPRINGS.default`**: `{ type: 'spring', stiffness: 400, damping: 30 }` (Cards, modals).
- **`fadeVariants`**, **`slideUpVariants`**, **`scaleVariants`**, **`staggerContainerVariants`**.

> **Rule**: All motion components automatically inherit `MotionConfig` settings and respect the user's OS `prefers-reduced-motion` setting.

---

## 5. Chart Foundation (`src/components/charts/`)

All charts wrap **Recharts** with automatic theme awareness and loading/empty state fallback handling:
- **`LineChart`**: Trend analysis and historical comparisons.
- **`AreaChart`**: Gradient area visualizations.
- **`BarChart`**: Rounded-top bar series.
- **`Sparkline`**: Compact 40px trend line for metric cards.
- **`KPICardChart`**: Embedded metric card with mini sparkline trend.

---

## 6. Dashboard Widget System (`src/components/widgets/`)

Widget containers provide a standardized card structure for dashboard grids:
- **`Widget`**, **`WidgetHeader`**, **`WidgetBody`**, **`WidgetFooter`**, **`WidgetGrid`**.

---

## 7. Component Registry & Variant Architecture (`src/registry/` & `src/variants/`)

- Visual variants are decoupled into dedicated `src/variants/*.variant.ts` files (e.g. `button.variant.ts`, `card.variant.ts`, `badge.variant.ts`).
- Component metadata, documentation, and versioning schemas are indexed in `src/registry/index.ts`.

---

## 8. Developer Guidelines & Best Practices

1. **No Direct Axios Calls**: Always invoke feature repositories (`AuthRepository`, `GroupRepository`, etc.).
2. **No Arbitrary Spacing**: Use `gap-4`, `gap-6`, `p-6` from the 8pt grid system.
3. **TypeScript Strictness**: Zero `any` types. All payloads validated via Zod schemas in `src/features/*/schemas/`.
4. **Dark Mode & Accessibility**: Test every component in dark mode and verify keyboard focus rings (`focus-ring`).
