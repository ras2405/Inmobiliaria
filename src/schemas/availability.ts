import { z } from 'zod';

export const availabilitySchema = z.object({
    propertyId: z.number(),
    startDate: z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date)),
    endDate: z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date)),
    isAvailable: z.boolean(),
});

export type AvailabilityDto = z.infer<typeof availabilitySchema>;
