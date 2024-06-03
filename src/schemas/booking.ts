import { z } from 'zod';

export const bookingSchema = z.object({
    document: z.string(),
    documentType: z.string(),
    name: z.string(),
    surname: z.string(),
    mail: z.string(),
    phone: z.string(),
    country: z.string(),
    state: z.string(),
    adults: z.number(),
    kids: z.number(),
    propertyId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
});

export type BookingDto = z.infer<typeof bookingSchema>;
