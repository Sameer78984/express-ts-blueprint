import { z } from 'zod';

export const createDemoSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
  }),
});

export type CreateDemoInput = z.infer<typeof createDemoSchema>['body'];
