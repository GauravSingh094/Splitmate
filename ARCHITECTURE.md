# 🏗️ Splito — System Architecture & Layering Manual

This document presents the complete system architecture, data flow, repository patterns, offline queuing, caching strategies, and rendering architecture for **Splito**.

---

## 📐 High-Level Architecture Diagram

```mermaid
graph TD
    Client["Browser / Mobile PWA"] --> UI["UI Components & Pages (Next.js 16)"]
    UI --> Repos["Domain Repositories (GroupRepo, ExpenseRepo, etc.)"]
    Repos --> Cache["Entity Cache Manager"]
    Repos --> OffQ["Offline Mutation Queue"]
    Repos --> GenClient["Generated API Client (src/generated/api/client.ts)"]
    GenClient --> Axios["Enterprise Axios HTTP Client"]
    Axios --> Backend["FastAPI Production Server (https://apiv1.splitmate.page/api/v1)"]
```

---

## 🏛️ Application Architecture Layers

1. **Presentation Layer (`src/app/`, `src/components/`)**:
   - Next.js 16 App Router using React Server Components (RSC) and Client Boundaries (`'use client'`).
   - Styled using Tailwind CSS v4 and the **Neo-Clay Surface Tokens**.
2. **Domain Repository Layer (`src/features/*/repositories/`)**:
   - Encapsulates data fetching and mutation logic. UI components consume domain Repositories (`GroupRepository`, `ExpenseRepository`, `BalanceRepository`, `SettlementRepository`), hiding API details.
3. **Entity Cache & Offline Engine (`src/lib/cache/`, `src/lib/offline/`)**:
   - In-memory entity caching with tag invalidations and IndexedDB mutation queue replay when connectivity recovers.
4. **Generated OpenAPI API Client (`src/generated/api/`)**:
   - Auto-generated TypeScript types and client wrapping Axios instance (`src/lib/axios.ts`).

---

## 🔄 Authentication & Refresh Queue Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as UI Component
    participant Repo as Repository Layer
    participant Axios as Axios Interceptor
    participant API as FastAPI Backend

    User->>UI: Triggers Action
    UI->>Repo: Calls Repository Method
    Repo->>Axios: Executes Request with Bearer Token
    Axios->>API: HTTP Request (Header: Authorization)
    API-->>Axios: 401 Unauthorized Response
    Axios->>API: POST /auth/refresh
    API-->>Axios: New Access Token
    Axios->>API: Re-executes Original Request
    API-->>Repo: 200 OK Response Data
    Repo-->>UI: Returns Typed Domain Data
```

---

## 📶 Offline Sync & PWA Architecture

```mermaid
flowchart LR
    A[User Offline Action] --> B{Network Status}
    B -- Online --> C[Direct Axios HTTP Request]
    B -- Offline --> D[Enqueue Mutation into Offline Queue]
    D --> E[Render Optimistic UI Update]
    F[Network Status Reconnect] --> G[Flush & Replay Queued Mutations]
    G --> H[Invalidate Affected Entity Cache]
```
