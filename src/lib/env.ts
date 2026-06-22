/* ============================================================================
   lib/env.ts — Validated environment variables
   ----------------------------------------------------------------------------
   Source: Architecture Plan v1.1 §3.2 (root layout), §13 (deployment)
   Phase 0 contract: .env.example (5-tier env-var system)

   All env vars are validated at build time via Zod. A missing REQUIRED var
   FAILS THE BUILD. OTP_DEV_MODE=true fails the production build.
   ============================================================================ */

import { z } from "zod";

const envSchema = z.object({
  /* Tier 1 — Required for dev */
  NEXT_PUBLIC_USE_MOCKS: z
    .string()
    .optional()
    .default("true")
    .transform((v) => v === "true"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default("en"),
  NEXT_PUBLIC_LOCALES: z.string().default("en,ur"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d+$/, "WhatsApp number must be digits only, no +")
    .default("923000000000"),
  NEXT_PUBLIC_BRAND_NAME: z.string().default("Aura Living"),

  /* Tier 2 — Prod-optional */
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY: z.string().optional(),
  HCAPTCHA_SECRET: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  PLAUSIBLE_DOMAIN: z.string().optional(),
  EDGE_CONFIG: z.string().optional(),
  VERCEL_FLAGS_SECRET: z.string().optional(),

  /* Tier 3 — Feature flags */
  FLAG_EID_2026_SALE: z
    .string()
    .optional()
    .default("false")
    .transform((v) => v === "true"),
  FLAG_MAINTENANCE_MODE: z
    .string()
    .optional()
    .default("false")
    .transform((v) => v === "true"),
  FLAG_BACK_IN_STOCK: z
    .string()
    .optional()
    .default("true")
    .transform((v) => v === "true"),
  FLAG_URDU_LOCALE: z
    .string()
    .optional()
    .default("true")
    .transform((v) => v === "true"),
  OTP_DEV_MODE: z
    .string()
    .optional()
    .default("true")
    .transform((v) => v === "true"),

  /* Tier 4 — Deferred full-stack */
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error(
      "Invalid environment variables. Check .env against .env.example"
    );
  }

  const env = parsed.data;

  // Production assertion: OTP_DEV_MODE must be false in production
  if (env.NODE_ENV === "production" && env.OTP_DEV_MODE) {
    throw new Error(
      "OTP_DEV_MODE=true is NOT allowed in production. Set OTP_DEV_MODE=false."
    );
  }

  return env;
}

export const env = parseEnv();

/* Convenience accessors */
export const siteConfig = {
  name: env.NEXT_PUBLIC_BRAND_NAME,
  url: env.NEXT_PUBLIC_SITE_URL,
  tagline: "Light, life, and living beauty — for the home you are becoming.",
  locale: env.NEXT_PUBLIC_DEFAULT_LOCALE,
  locales: env.NEXT_PUBLIC_LOCALES.split(","),
  whatsapp: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  useMocks: env.NEXT_PUBLIC_USE_MOCKS,
  isProduction: env.NODE_ENV === "production",
  isDev: env.NODE_ENV === "development",
  flags: {
    eidSale: env.FLAG_EID_2026_SALE,
    maintenance: env.FLAG_MAINTENANCE_MODE,
    backInStock: env.FLAG_BACK_IN_STOCK,
    urduLocale: env.FLAG_URDU_LOCALE,
  },
} as const;
