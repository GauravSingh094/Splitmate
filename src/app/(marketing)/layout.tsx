/**
 * Marketing route group layout.
 * Public-facing pages render within this layout.
 * Navigation and footer will be added in later phases.
 */
export default function MarketingLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <main id="main-content" className="flex-1">
      {children}
    </main>
  );
}
