# store/

Global client-side state that is not server state (TanStack Query handles server state).

State stores will use Zustand when complex client-side state is needed.
Each store file maps to a single domain slice:

- `ui.store.ts` — sidebar open/close, modals, sheet state
- `preferences.store.ts` — user display preferences
- `filters.store.ts` — active filter state across views

Stores are introduced only when a feature requires persistent client state
that cannot be derived from URL params or server data.
