import { z } from "zod";

export const paymentCallbackSchema = z.object({
    status: z.enum(["success", "failure"]),
});

export const paymentCallbackWithIdSchema = paymentCallbackSchema.extend({
    id: z.number().positive(),
});

export type PaymentCallbackDto = z.infer<typeof paymentCallbackWithIdSchema>;
