# 📊 Splito — Enterprise Reporting & Export Platform

This document describes the reporting architecture, supported export formats, CSV/JSON export engines, browser print services, and extension patterns for **Splito**.

---

## 🏗️ Architecture Overview

The reporting engine operates as a modular feature under `src/features/reports/`. It consumes existing Domain Repositories and TanStack Query state, ensuring that reports contain up-to-date financial records without duplicate backend calculations.

```
Domain Repositories (GroupRepo, ExpenseRepo, BalanceRepo)
       ↓
Report Data Aggregator & Filter Preserver
       ↓
Exporters (csv-exporter, json-exporter, print-service)
       ↓
Browser File Download / Native Print Window
```

---

## 📄 Supported Export Formats

1. **CSV (`exportToCsv`)**:
   - Encodes UTF-8 with Byte Order Mark (`\uFEFF`) for Excel compatibility.
   - Escapes quotes and commas safely (`"field"`).
2. **JSON (`exportToJson`)**:
   - Exports formatted JSON records (`JSON.stringify(data, null, 2)`).
3. **Print (`triggerPrintPage`)**:
   - Launches native browser print window using `@media print` CSS resets.

---

## 💻 Developer Code Example

```typescript
import { exportToCsv } from '@/features/reports/exporters';

const expenses = [
  { id: 'exp-1', title: 'Dinner', amount: 45.0, currency: 'USD' }
];

exportToCsv('Expense_Ledger', expenses);
```
