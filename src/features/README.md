# features/

Feature-first modules. Each subdirectory is a self-contained feature with its own:

- `components/` — UI components specific to this feature
- `hooks/` — custom hooks
- `schemas/` — Zod validation schemas
- `types/` — TypeScript types
- `queries/` — TanStack Query query definitions
- `mutations/` — TanStack Query mutation definitions
- `repository.ts` — data access using BaseRepository
- `service.ts` — business logic

Features:

- `auth/` — authentication and session management
- `groups/` — expense groups
- `expenses/` — individual expense entries
- `settlements/` — payment settlements
- `analytics/` — charts and reporting
- `profile/` — user profile management
