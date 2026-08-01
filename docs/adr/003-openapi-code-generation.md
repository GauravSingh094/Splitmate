# ADR 003: Automated OpenAPI Specification Code Generation

- **Status**: Accepted
- **Date**: 2026-08-01

## Context
Maintaining manual TypeScript request/response DTOs creates risk of backend schema drift and type mismatch errors.

## Decision
We adopted `openapi-typescript` to automatically compile `openapi.json` into type-safe DTOs (`src/generated/api/types.ts`).

## Consequences
- **Positive**: 100% backend contract alignment.
- **Positive**: Updating backend schemas requires only executing `pnpm generate:api`.
