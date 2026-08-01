# 🎨 Splito — Personalization & Theme Platform

This document describes the personalization store architecture, accent theme tokens, display density modes, motion preferences, and configuration import/export for **Splito**.

---

## 🏛️ Personalization Architecture

Personalization is managed by `usePersonalization` (`src/features/personalization/store/personalization-store.ts`). It persists settings locally (`splito_user_personalization_v1`) and updates root HTML data attributes (`data-accent`, `data-density`, `data-motion`).

```
usePersonalization Hook
       ↓
HTML Root Data Attributes (data-accent, data-density, data-motion)
       ↓
Tailwind CSS Tokens & Neo-Clay Glass Surfaces
       ↓
Live Instant Preview (No Page Refresh)
```

---

## 🎨 Accent Themes & Display Modes

| Setting | Options | Effect |
|---|---|---|
| **Accent Theme** | `Indigo`, `Emerald`, `Purple`, `Amber`, `Rose` | Dynamic primary brand accent |
| **Display Density** | `Compact`, `Comfortable`, `Spacious` | Padding, table row height & card margins |
| **Motion** | `Normal`, `Reduced`, `Disabled` | Framer Motion transition speed & reduced motion |
| **Contrast** | `Default`, `High Contrast` | Border thickness & text contrast enhancement |

---

## 💻 Developer Usage

```typescript
import { usePersonalization } from '@/features/personalization/store/personalization-store';

const { settings, updateSettings } = usePersonalization();

// Switch accent color
updateSettings({ accentColor: 'emerald' });
```
