import { z } from 'zod';

export const earningsSchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)),
    propertyId: z.string()
    .transform((val) => parseInt(val))
    .refine((val) => val >= 1, { message: 'Property id must be a positive number' })
});

export type EarningsDto = z.infer<typeof earningsSchema>;
