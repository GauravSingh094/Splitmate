/**
 * Auth route group layout.
 * Centered container layout for authentication screens.
 */
export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center justify-center">
      {children}
    </main>
  );
}
