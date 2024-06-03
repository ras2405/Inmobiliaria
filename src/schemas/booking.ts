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
    adults: z.number().min(1, 'There must be at least one adult.').max(20, 'There can be no more than 20 adults.'),
    kids: z.number().min(0, 'There can be no less than 0 kids.').max(10, 'There can be no more than 10 kids.'),
    propertyId: z.number().min(50, 'There can be no less than 50 meters to the beach.').max(20000, 'There can be no more than 20000 meters to the beach.'),
    startDate: z.string(),
    endDate: z.string(),
});

export type BookingDto = z.infer<typeof bookingSchema>;
