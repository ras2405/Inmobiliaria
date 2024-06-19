import { z } from 'zod';

export const bookingMail = z.object({
    mail: z.string().email('Mail must be valid')
});

export type BookingMailDto = z.infer<typeof bookingMail>;
