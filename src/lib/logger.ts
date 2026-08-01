interface ErrorLogPayload {
  message: string;
  stack?: string;
  digest?: string;
  context?: Record<string, unknown>;
}

/**
 * Enterprise error logging interface.
 * Centralized point for capturing frontend exceptions.
 */
export const logger = {
  error(error: Error | string | unknown, context?: Record<string, unknown>) {
    let message = 'An unexpected error occurred';
    let stack: string | undefined;
    let digest: string | undefined;

    if (typeof error === 'string') {
      message = error;
    } else if (error && typeof error === 'object') {
      const errObj = error as { message?: string; stack?: string; digest?: string };
      message = errObj.message || 'Unknown error object';
      stack = errObj.stack;
      digest = errObj.digest;
    }

    const payload: ErrorLogPayload = {
      message,
      stack,
      digest,
      context,
    };

    if (process.env.NODE_ENV === 'development') {
      console.error(`[Splito Logger Error]: ${message}`, payload);
    } else {
      console.error(JSON.stringify(payload));
    }
  },

  warn(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Splito Logger Warn]', message, context);
    }
  },

  info(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.info('[Splito Logger Info]', message, context);
    }
  },
};
