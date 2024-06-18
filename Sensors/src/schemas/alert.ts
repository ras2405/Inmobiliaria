import { z } from "zod";

export const alertSchema = z.object({
    id: z.string().max(15, 'Id must be less than 15 characters.'),
    measurement: z.string().max(50, 'Measurement must be less than 50 characters.'),
    value: z.number(),
    priority: z.number().min(1).max(5),
    message: z.string().max(100, 'Message must be less than 100 characters.')
});

export type AlertDto = z.infer<typeof alertSchema>;
