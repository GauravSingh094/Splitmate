'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root error boundary.
 * Catches render errors anywhere in the subtree below the root layout.
 * Displays a recoverable error screen with a retry action.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error(error, { location: 'RootErrorBoundary' });
  }, [error]);

  return (
    <div
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 text-center"
    >
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Something went wrong
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          An unexpected error occurred
        </h1>
        {error.digest && (
          <p className="font-mono text-xs text-muted-foreground">Error ID: {error.digest}</p>
        )}
      </div>

      <button
        onClick={reset}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Try again
      </button>
    </div>
  );
}
