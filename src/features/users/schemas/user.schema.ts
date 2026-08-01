import { z } from 'zod';
import { emailSchema } from '@/schemas/common';

// ─── User response (GET /users/me, PATCH /users/me) ──────────────────────────
export const userProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: emailSchema,
  preferred_currency: z.string(),
  is_active: z.boolean(),
});

// ─── Update user request ─────────────────────────────────────────────────────
export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  preferred_currency: z.string().length(3).toUpperCase().optional(),
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type UserProfile = z.infer<typeof userProfileSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
