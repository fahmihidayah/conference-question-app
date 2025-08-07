import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .min(1)
      .default(
        'postgresql://postgres.xcmbintaeueklcrvbfez:Test@123@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres'
      ),
    APP_URL: z.string().url().optional(),
    GOOGLE_SITE_VERIFICATION_ID: z.string().optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    APP_URL: process.env.APP_URL,
    GOOGLE_SITE_VERIFICATION_ID: process.env.GOOGLE_SITE_VERIFICATION_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  skipValidation: process.env.NODE_ENV === 'test' || process.env.CI === 'true',
});
