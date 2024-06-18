import { z } from 'zod';

export const paySchema = z.object({
    amount: z.number().positive(),
    cardNumber: z.string().length(16),
});

export const payWithIdSchema = paySchema.extend({
    propertyId: z.number().positive(),
});

export type PayDto = z.infer<typeof payWithIdSchema>;
