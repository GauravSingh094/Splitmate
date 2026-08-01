import { z } from 'zod';

// ─── Notification type enum ───────────────────────────────────────────────────
export const notificationTypeSchema = z.enum([
  'EXPENSE_CREATED',
  'EXPENSE_REVERSED',
  'SETTLEMENT_RECORDED',
  'MEMBER_ADDED',
]);

// ─── Notification metadata (varies by type) ───────────────────────────────────
export const notificationMetadataSchema = z.object({
  group_id: z.string().uuid().optional(),
  expense_id: z.string().uuid().optional(),
  settlement_id: z.string().uuid().optional(),
  amount: z.string().optional(),
});

// ─── Notification response (GET /notifications) ────────────────────────────────
export const notificationSchema = z.object({
  id: z.string().uuid(),
  type: z.string().default('EXPENSE_CREATED'),
  title: z.string(),
  message: z.string(),
  is_read: z.boolean().default(false),
  metadata: notificationMetadataSchema.optional().nullable(),
  created_at: z.string(),
});

// ─── Mark all read response (PATCH /notifications/read-all) ──────────────────
export const markAllReadResponseSchema = z.object({
  updated_count: z.number(),
});

// ─── Derived types ────────────────────────────────────────────────────────────
export type NotificationType = z.infer<typeof notificationTypeSchema>;
export type NotificationMetadata = z.infer<typeof notificationMetadataSchema>;
export type NotificationItem = z.infer<typeof notificationSchema>;
export type Notification = NotificationItem;
export type MarkAllReadResponse = z.infer<typeof markAllReadResponseSchema>;
