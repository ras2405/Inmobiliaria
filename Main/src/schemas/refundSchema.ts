import { z } from 'zod';

export const refundSchema = z.object({
    cardNumber: z.string().length(16),
});

export const refundWithIdSchema = refundSchema.extend({
    id: z.number().positive(),
});

export type RefundDto = z.infer<typeof refundWithIdSchema>;
