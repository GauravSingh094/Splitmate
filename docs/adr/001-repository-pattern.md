# ADR 001: Adoption of Repository Pattern for Domain Data

- **Status**: Accepted
- **Date**: 2026-07-30

## Context
Splito required a clean separation between UI components and backend HTTP API details to prevent tight coupling and facilitate automated offline queuing and testing.

## Decision
We adopted the **Repository Pattern** (`src/features/*/repositories/`). Components interact exclusively with Repositories rather than raw Axios calls.

## Consequences
- **Positive**: Components remain agnostic of network specifics, error statuses, and HTTP clients.
- **Positive**: Simplifies mocking in unit tests and offline mutation queuing.
