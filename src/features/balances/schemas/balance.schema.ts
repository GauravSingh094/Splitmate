import { z } from 'zod';

// ─── Pairwise balance (inside GroupBalancesResponse) ─────────────────────────
export const pairwiseBalanceSchema = z.object({
  from_user_id: z.string().uuid(),
  from_user_name: z.string(),
  to_user_id: z.string().uuid(),
  to_user_name: z.string(),
  amount: z.string(), // decimal string
  currency: z.string(),
});

// ─── Simplified balance (inside SimplifiedBalancesResponse) ──────────────────
export const simplifiedBalanceSchema = z.object({
  from_user_id: z.string().uuid(),
  from_user_name: z.string(),
  to_user_id: z.string().uuid(),
  to_user_name: z.string(),
  amount: z.string(),
  currency: z.string(),
});

// ─── Group balances response (GET /groups/{id}/balances) ─────────────────────
export const groupBalancesResponseSchema = z.object({
  group_id: z.string().uuid(),
  currency: z.string(),
  balances: z.array(pairwiseBalanceSchema),
});

// ─── Simplified balances response (GET /groups/{id}/balances/simplified) ─────
export const simplifiedBalancesResponseSchema = z.object({
  group_id: z.string().uuid(),
  currency: z.string(),
  transactions: z.array(simplifiedBalanceSchema),
});

// ─── Overall balance per counterpart (GET /users/me/balances) ────────────────
export const userOverallBalanceSchema = z.object({
  counterpart_user_id: z.string().uuid(),
  counterpart_name: z.string(),
  net_amount: z.string(), // decimal string; positive = owed to me, negative = I owe
  currency: z.string(),
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type PairwiseBalance = z.infer<typeof pairwiseBalanceSchema>;
export type SimplifiedBalance = z.infer<typeof simplifiedBalanceSchema>;
export type GroupBalancesResponse = z.infer<typeof groupBalancesResponseSchema>;
export type SimplifiedBalancesResponse = z.infer<typeof simplifiedBalancesResponseSchema>;
export type UserOverallBalance = z.infer<typeof userOverallBalanceSchema>;
