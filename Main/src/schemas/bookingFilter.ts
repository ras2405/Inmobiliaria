import { z } from 'zod';
import { BookingStatus } from '../constants/payments';

export const bookingFilterSchema = z.object({
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)).optional(),
    propertyId: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 1, { message: 'Property id must be a positive number' }).optional(),
    mail: z.string().email('Mail must be valid').optional(),
    name: z.string().regex(/^[(a-z)(A-Z) ñÇç]{3,30}$/,'Name must contain text, from 3 to 30 characters').optional(),
    surname: z.string().regex(/^[(a-z)(A-Z) ñÇç]{3,30}$/,'Name must contain text, from 3 to 30 characters').optional(),
    status: z.enum([BookingStatus.ACTIVE, BookingStatus.CANCELLED_BY_TENANT,BookingStatus.CANCELLED_NON_PAYMENT
        , BookingStatus.PENDING]).optional()
});

export type BookingFilterDto = z.infer<typeof bookingFilterSchema>;
