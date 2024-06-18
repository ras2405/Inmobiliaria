import { z } from 'zod';

export const paymentSchema = z.object({
    amount: z.number().positive(),
    cardNumber: z.string().length(16),
    callback: z.string().url(),
});

export type PaymentDto = z.infer<typeof paymentSchema>;
