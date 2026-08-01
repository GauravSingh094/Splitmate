# 📐 Splito — Engineering Standards & Coding Guidelines

This document outlines the coding standards, design patterns, and architectural rules enforced across **Splito**.

---

## 🏗️ Architecture & Component Boundaries

1. **Repository Pattern (`src/repositories/` / `src/features/*/repositories/`)**:
   - UI components **never** invoke HTTP requests directly. They consume domain Repositories.
2. **Entity Cache Integration (`src/lib/cache/`)**:
   - Standardized cache keys and selective invalidations keep state fresh without duplicate network fetches.
3. **Design System Tokens (`src/app/globals.css`)**:
   - Always use tailwind CSS custom properties (`bg-background`, `text-foreground`, `shadow-neo-2`). Never hardcode raw hex values.
4. **Error Handling**:
   - Normalize backend API failures to `AppApiError` instances with typed error codes.
