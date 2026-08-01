# ADR 002: Centralized Entity Cache & Offline Mutation Queue

- **Status**: Accepted
- **Date**: 2026-07-30

## Context
Users need to view groups, expenses, and notifications during transient network drops or full offline states.

## Decision
We implemented a centralized **Entity Cache Manager** coupled with an IndexedDB-backed **Offline Mutation Queue** that automatically flushes and replays mutations upon reconnection.

## Consequences
- **Positive**: Seamless offline usage comparable to desktop apps (Linear, Notion).
- **Positive**: Eliminates redundant network fetches by maintaining entity invalidation tags.
