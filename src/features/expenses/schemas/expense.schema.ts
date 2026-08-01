import { z } from 'zod';

// ─── Participant (nested in ExpenseResponse) ─────────────────────────────────
// Backend returns: user_id, name, owed_amount, percentage (nullable), shares (nullable)
export const participantSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  owed_amount: z.string(), // decimal string from API
  percentage: z.string().nullable().optional(),
  shares: z.number().nullable().optional(),
});

// ─── Expense response (GET/POST /groups/{id}/expenses or GET /expenses/{id}) ──
export const expenseSchema = z.object({
  id: z.string().uuid(),
  group_id: z.string().uuid(),
  paid_by_user_id: z.string().uuid(),
  paid_by_name: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  total_amount: z.string(), // decimal string
  currency: z.string(),
  split_type: z.string(),
  status: z.string(),
  created_at: z.string(),
  participants: z.array(participantSchema).default([]),
});

// ─── Split type literals ──────────────────────────────────────────────────────
export const splitTypeSchema = z.enum(['EQUAL', 'EXACT', 'PERCENTAGE', 'SHARE']);

// ─── Participant input shapes ─────────────────────────────────────────────────
export const equalParticipantSchema = z.object({ user_id: z.string().uuid() });

export const exactParticipantSchema = z.object({
  user_id: z.string().uuid(),
  owed_amount: z.union([z.number().min(0, 'Amount cannot be negative'), z.string()]),
});

export const percentageParticipantSchema = z.object({
  user_id: z.string().uuid(),
  percentage: z.union([
    z.number().min(0, 'Percentage cannot be negative').max(100, 'Percentage cannot exceed 100%'),
    z.string(),
  ]),
});

export const shareParticipantSchema = z.object({
  user_id: z.string().uuid(),
  shares: z.union([
    z.number().min(0, 'Shares cannot be negative').int('Shares must be a whole number'),
    z.string(),
  ]),
});

// ─── Create expense form schema ───────────────────────────────────────────────
export const createExpenseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  total_amount: z.union([
    z.number().positive('Amount must be greater than 0'),
    z.string().min(1, 'Amount is required'),
  ]),
  currency: z.string().length(3, 'Must be a 3-letter currency code').toUpperCase(),
  paid_by_user_id: z.string().uuid('Must select who paid'),
  split_type: splitTypeSchema,
  participants_equal: z.array(equalParticipantSchema).optional(),
  participants_exact: z.array(exactParticipantSchema).optional(),
  participants_percentage: z.array(percentageParticipantSchema).optional(),
  participants_share: z.array(shareParticipantSchema).optional(),
});

// ─── Update expense form schema ───────────────────────────────────────────────
export const updateExpenseSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().nullable().optional(),
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type Expense = z.infer<typeof expenseSchema>;
export type Participant = z.infer<typeof participantSchema>;
export type SplitType = z.infer<typeof splitTypeSchema>;
export type EqualParticipant = z.infer<typeof equalParticipantSchema>;
export type ExactParticipant = z.infer<typeof exactParticipantSchema>;
export type PercentageParticipant = z.infer<typeof percentageParticipantSchema>;
export type ShareParticipant = z.infer<typeof shareParticipantSchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
