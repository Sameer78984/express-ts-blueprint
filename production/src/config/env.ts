import { z } from "zod";
import dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, "../../.env") });

/**
 * Schema Validation for Environment Variables
 *
 * It is best practice to validate your environment variables at start-up.
 * This ensures that the application will fail fast if a required variable is missing,
 * avoiding runtime errors later.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10)),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  CORS_ORIGIN: z.string().default("*"),
});

// Validate process.env against the schema
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

// Export the validated environment variables
export const env = parsedEnv.data;
