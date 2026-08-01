/**
 * Global Splito Domain Constants
 */

export const APP_CONFIG = {
  name: 'Splito',
  defaultCurrency: 'USD',
  supportedCurrencies: ['USD', 'EUR', 'GBP', 'INR', 'JPY'] as const,
  defaultPaginationLimit: 20,
  maxGroupMembers: 100,
  maxExpenseAmount: 1000000,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
