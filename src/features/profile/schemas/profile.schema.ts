import { z } from 'zod';
import { emailSchema } from '@/schemas/common';

export const profileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: emailSchema,
  phone: z.string().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  bio: z.string().max(500).optional(),
});

export type Profile = z.infer<typeof profileSchema>;
