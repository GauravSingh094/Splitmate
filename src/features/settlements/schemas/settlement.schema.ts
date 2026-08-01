import { z } from 'zod';

// ─── Settlement response (GET/POST /groups/{id}/settlements) ──────────────────
// Backend returns: from_user_id, from_user_name, to_user_id, to_user_name
export const settlementSchema = z.object({
  id: z.string().uuid(),
  group_id: z.string().uuid(),
  from_user_id: z.string().uuid(),
  from_user_name: z.string().optional(),
  to_user_id: z.string().uuid(),
  to_user_name: z.string().optional(),
  amount: z.string(), // decimal string from API
  currency: z.string(),
  note: z.string().nullable().optional(),
  status: z.string(),
  created_at: z.string(),
});

// ─── Create settlement request (POST /groups/{id}/settlements) ────────────────
// Backend expects: from_user_id, to_user_id, amount, currency, note (optional)
export const createSettlementSchema = z.object({
  from_user_id: z.string().uuid('Must select who paid'),
  to_user_id: z.string().uuid('Must select who received'),
  amount: z.union([z.number().positive('Amount must be greater than 0'), z.string().min(1)]),
  currency: z.string().length(3).toUpperCase(),
  note: z.string().optional(),
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type Settlement = z.infer<typeof settlementSchema>;
export type CreateSettlementInput = z.infer<typeof createSettlementSchema>;
