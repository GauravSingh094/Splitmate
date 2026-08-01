# ⚛️ Splito — Frontend Architecture & React Guide

This guide details Next.js 16 App Router patterns, React 19 concurrent features, state management strategies, form handling, and provider compositions for **Splito**.

---

## 🎨 Next.js 16 & React 19 Patterns

- **Server Components (RSC)**: Used by default in `src/app/` for static shell rendering, SEO metadata, and route layouts.
- **Client Boundaries (`'use client'`)**: Applied to interactive components, modals, form controls, charts, and hooks.
- **URL Query State Persistence (`nuqs`)**: Retains search inputs, active tabs, and filter states directly in the URL bar (e.g. `/groups?search=trip&tab=expenses`).

---

## 🌳 Provider Nesting Hierarchy (`src/providers/index.tsx`)

All application providers are composed cleanly in `<AppProviders>`:

```tsx
<ThemeProvider>
  <MotionProvider>
    <ViewportProvider>
      <SessionProvider>
        <QueryProvider>
          <ToastProvider>
            <TooltipProvider>
              <ModalProvider>
                <CommandProvider>
                  <NuqsAdapter>
                    {children}
                  </NuqsAdapter>
                </CommandProvider>
              </ModalProvider>
            </TooltipProvider>
          </ToastProvider>
        </QueryProvider>
      </SessionProvider>
    </ViewportProvider>
  </MotionProvider>
</ThemeProvider>
```

---

## 📋 Form Validation Architecture

Forms are built using **React Hook Form** coupled with **Zod Schemas**:

```typescript
const form = useForm<CreateExpenseInput>({
  resolver: zodResolver(createExpenseSchema),
  defaultValues: { title: '', amount: 0, splitType: 'EQUAL' }
});
```
