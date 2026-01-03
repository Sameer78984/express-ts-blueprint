import { z } from "zod";

/**
 * 🛡️ SCHEMA (The Guard)
 * ---------------------
 * This file defines strict rules for what data we accept.
 * If the data sent by the user doesn't match these rules, we reject it immediately.
 *
 * This prevents bad data from ever reaching our code!
 */
export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username cannot exceed 20 characters"),
    email: z.string().email("Please provide a valid email address"),
    age: z.number().min(18, "User must be at least 18 years old").optional(),
  }),
});

// Extract TypeScript type from the schema automatically
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
