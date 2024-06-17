import { z } from "zod";

export const alertSchema = z.object({
    id: z.string().max(15, 'Id must be less than 15 characters.'),
    measurement: z.string().max(50, 'Measurement must be less than 50 characters.'),
    value: z.string(),
    priority: z.number().min(1).max(5)
});

export type AlertDto = z.infer<typeof alertSchema>;
