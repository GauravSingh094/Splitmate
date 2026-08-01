import { z } from 'zod';
import { emailSchema } from '@/schemas/common';

// ─── Group member response (GET /groups/{id}/members) ────────────────────────
export const memberSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  email: emailSchema,
  role: z.string(),
  status: z.string(),
  joined_at: z.string(),
});

// ─── Add member request (POST /groups/{id}/members) ─────────────────────────
// API only accepts { email } — no role field
export const addMemberSchema = z.object({
  email: emailSchema,
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type Member = z.infer<typeof memberSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
