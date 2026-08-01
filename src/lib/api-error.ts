import type { z } from 'zod';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNPROCESSABLE_ENTITY'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'TIMEOUT'
  | 'NETWORK_ERROR'
  | 'OFFLINE'
  | 'CANCELLED'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export interface FieldValidationError {
  field: string;
  messages: string[];
}

export class AppApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly fieldErrors?: FieldValidationError[];
  readonly originalError?: unknown;

  constructor(
    message: string,
    code: ApiErrorCode = 'UNKNOWN_ERROR',
    status = 500,
    fieldErrors?: FieldValidationError[],
    originalError?: unknown,
  ) {
    super(message);
    this.name = 'AppApiError';
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
    this.originalError = originalError;

    // Restore prototype chain
    Object.setPrototypeOf(this, AppApiError.prototype);
  }

  static fromStatus(
    status: number,
    message?: string,
    fieldErrors?: FieldValidationError[],
  ): AppApiError {
    switch (status) {
      case 400:
        return new AppApiError(message ?? 'Bad Request', 'BAD_REQUEST', 400, fieldErrors);
      case 401:
        return new AppApiError(message ?? 'Unauthorized', 'UNAUTHORIZED', 401);
      case 403:
        return new AppApiError(message ?? 'Forbidden', 'FORBIDDEN', 403);
      case 404:
        return new AppApiError(message ?? 'Resource Not Found', 'NOT_FOUND', 404);
      case 409:
        return new AppApiError(message ?? 'Conflict Error', 'CONFLICT', 409);
      case 422:
        return new AppApiError(
          message ?? 'Validation Error',
          'UNPROCESSABLE_ENTITY',
          422,
          fieldErrors,
        );
      case 429:
        return new AppApiError(message ?? 'Too Many Requests', 'TOO_MANY_REQUESTS', 429);
      case 500:
        return new AppApiError(message ?? 'Internal Server Error', 'INTERNAL_SERVER_ERROR', 500);
      case 503:
        return new AppApiError(message ?? 'Service Unavailable', 'SERVICE_UNAVAILABLE', 503);
      default:
        return new AppApiError(message ?? 'An unexpected error occurred', 'UNKNOWN_ERROR', status);
    }
  }

  static fromZodError(zodError: z.ZodError): AppApiError {
    const flattened = zodError.flatten().fieldErrors;
    const fieldErrors: FieldValidationError[] = Object.entries(flattened).map(
      ([field, messages]) => ({
        field,
        messages: (messages as string[]) ?? [],
      }),
    );

    return new AppApiError(
      'Client-side schema validation failed',
      'VALIDATION_ERROR',
      422,
      fieldErrors,
      zodError,
    );
  }
}
