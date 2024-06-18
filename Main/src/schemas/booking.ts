import { z } from 'zod';

export const bookingSchema = z.object({
    document: z.string().regex(/^[(a-z)(A-Z)(0-9)_.-]{1,30}$/, 'Document can only contain letters, numbers, hyphen, underscore y dot, from 1 to 30 characters max'),
    documentType: z.string(),
    name: z.string().regex(/^[(a-z)(A-Z) ñÇç]{3,30}$/, 'Name must contain text, from 3 to 30 characters'),
    surname: z.string().regex(/^[(a-z)(A-Z) ñÇç]{3,30}$/, 'Name must contain text, from 3 to 30 characters'),
    mail: z.string().email('Mail must be valid'),
    phone: z.string().regex(/^[+]?[0-9\s-]{7,15}$/, 'Phone must be 7 and 15 numbers long'),
    country: z.string(),
    state: z.string(),
    adults: z.number(),
    kids: z.number(),
    propertyId: z.number().min(1, 'The id must be a positive number'),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date)),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date)),
});

export type BookingDto = z.infer<typeof bookingSchema>;
