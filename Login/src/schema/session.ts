import { z } from 'zod';

export const sessionSchema = z.object({
    mail: z.string().email(),
    token: z.string(),
    role: z.enum(["Admin", "Operator", "Owner", "Tenant"])
});

export type SessionDto = z.infer<typeof sessionSchema>;
