# ⚡ Splito — Automated OpenAPI Platform Architecture

This document describes the OpenAPI code generation workflow, generated directory structure, repository pattern integration, and regeneration commands for **Splito**.

---

## 🏗️ Architecture Overview

Splito enforces a strict separation of concerns where the backend **OpenAPI Specification (`openapi.json`)** acts as the single source of truth for API models, request/response DTOs, and endpoint definitions.

```
OpenAPI Spec (openapi.json)
       ↓ (npx openapi-typescript)
Generated DTOs & Types (src/generated/api/)
       ↓
Generated Client (src/generated/api/client.ts)
       ↓
Repository Layer (src/features/*/repositories/)
       ↓
TanStack Query Hooks / UI Components
```

---

## 📁 Directory Structure (`src/generated/`)

```
src/generated/
└── api/
    ├── types.ts          # Auto-generated TypeScript types & DTOs
    ├── client.ts         # Axios-wrapped typed API client
    └── index.ts          # Barrel export
```

---

## 🔄 Regeneration Process

Whenever backend API routes or OpenAPI schemas are updated, run:

```bash
npx openapi-typescript openapi.json -o src/generated/api/types.ts
```

Or execute the script:

```bash
pnpm generate:api
```

---

## 🛡️ Repository Layer Integration

Components never call the generated API client directly. They always interact via domain Repositories:

```typescript
// Component -> Repository -> Generated Client -> Axios -> Backend
export class GroupRepository extends BaseRepository {
  async listGroups() {
    return generatedApiClient.get('/groups');
  }
}
```

---

## 🚦 CI/CD Automated Verification

The GitHub Actions pipeline (`.github/workflows/ci.yml`) verifies that generated types pass TypeScript checks (`npx tsc --noEmit`) and match the latest OpenAPI schema definitions before any code is merged.
