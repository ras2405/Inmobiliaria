import { z } from 'zod';

export const sessionSchema = z.object({
    mail: z.string().email(),
    token: z.string()
});

export type SessionDto = z.infer<typeof sessionSchema>;
