import { z } from 'zod';

export const activityItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  actorName: z.string(),
  actorAvatar: z.string().nullable().optional(),
  createdAt: z.string(),
});

export type ActivityItemModel = z.infer<typeof activityItemSchema>;
