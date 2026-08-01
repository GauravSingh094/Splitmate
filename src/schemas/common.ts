import { z } from 'zod';

// ─── Common scalars ───────────────────────────────────────────────────────────
export const currencyCodeSchema = z
  .string()
  .length(3, 'Currency must be a 3-letter ISO 4217 code')
  .toUpperCase();

export const currencyAmountSchema = z.union([
  z.number().nonnegative(),
  z.string().transform((v) => parseFloat(v)),
]);

export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
