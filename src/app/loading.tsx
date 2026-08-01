export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="absolute h-10 w-10 animate-spin rounded-full border-2 border-border border-t-foreground" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
