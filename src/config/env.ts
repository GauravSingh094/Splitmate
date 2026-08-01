import { z } from 'zod';

/**
 * Environment variable schema — validated at startup.
 */
const envSchema = z.object({
  // Application
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Splitmate'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('0.1.0'),

  // API — defaults to relative '/api/v1' which proxies through Next.js server rewrites
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1).default('/api/v1'),
  NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),

  // Feature Flags
  NEXT_PUBLIC_FF_AI_SUGGESTIONS: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  NEXT_PUBLIC_FF_RECEIPT_SCANNING: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  NEXT_PUBLIC_FF_ANALYTICS_DASHBOARD: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  NEXT_PUBLIC_FF_MULTI_CURRENCY: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),

  // Telemetry
  NEXT_TELEMETRY_DISABLED: z.coerce.number().int().default(1),
});

/**
 * Parsed and type-safe environment variables.
 */
export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL'],
  NEXT_PUBLIC_APP_NAME: process.env['NEXT_PUBLIC_APP_NAME'],
  NEXT_PUBLIC_APP_VERSION: process.env['NEXT_PUBLIC_APP_VERSION'],
  NEXT_PUBLIC_API_BASE_URL: process.env['NEXT_PUBLIC_API_BASE_URL'],
  NEXT_PUBLIC_API_TIMEOUT_MS: process.env['NEXT_PUBLIC_API_TIMEOUT_MS'],
  NEXT_PUBLIC_FF_AI_SUGGESTIONS: process.env['NEXT_PUBLIC_FF_AI_SUGGESTIONS'],
  NEXT_PUBLIC_FF_RECEIPT_SCANNING: process.env['NEXT_PUBLIC_FF_RECEIPT_SCANNING'],
  NEXT_PUBLIC_FF_ANALYTICS_DASHBOARD: process.env['NEXT_PUBLIC_FF_ANALYTICS_DASHBOARD'],
  NEXT_PUBLIC_FF_MULTI_CURRENCY: process.env['NEXT_PUBLIC_FF_MULTI_CURRENCY'],
  NEXT_TELEMETRY_DISABLED: process.env['NEXT_TELEMETRY_DISABLED'],
});

export type Env = z.infer<typeof envSchema>;
