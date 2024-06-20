import { z } from 'zod';

export const earningsSchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date))
});

export type EarningsDto = z.infer<typeof earningsSchema>;
