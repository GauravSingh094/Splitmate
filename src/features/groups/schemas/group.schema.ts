import { z } from 'zod';

// ─── Group list item (GET /groups) ──────────────────────────────────────────
export const groupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  default_currency: z.string(),
  status: z.string(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  members_count: z.number().int().nonnegative().default(0),
});

// ─── Group member (nested in GroupDetailResponse) ───────────────────────────
export const groupMemberSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  status: z.string(),
  joined_at: z.string(),
});

// ─── Group detail (GET /groups/{id}) ────────────────────────────────────────
export const groupDetailSchema = groupSchema.extend({
  members: z.array(groupMemberSchema).default([]),
});

// ─── Create group form schema (frontend validation) ──────────────────────────
export const createGroupSchema = z.object({
  name: z.string().min(2, 'Group name must be at least 2 characters'),
  currency: z.string().length(3, 'Must be a 3-letter currency code').toUpperCase(),
  description: z.string().optional(),
});

// ─── Update group form schema ────────────────────────────────────────────────
export const updateGroupSchema = z.object({
  name: z.string().min(2).optional(),
});

// ─── Derived types ───────────────────────────────────────────────────────────
export type Group = z.infer<typeof groupSchema>;
export type GroupDetail = z.infer<typeof groupDetailSchema>;
export type GroupMember = z.infer<typeof groupMemberSchema>;
export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
