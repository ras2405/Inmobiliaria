import { z } from 'zod';

export const loginSchema = z.object({
    mail: z.string().email(),
    password: z.string()
});

export type LoginDto = z.infer<typeof loginSchema>;
