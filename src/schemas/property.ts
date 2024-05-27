import { z } from 'zod';

export const propertySchema = z.object({
    name: z.string(),
    adults: z.number().min(1, 'There must be at least one adult.').max(20, 'There can be no more than 20 adults.'),
    kids: z.number().min(0, 'There can be no less than 0 kids.').max(10, 'There can be no more than 10 kids.'),
    beds: z.number().min(1, 'There must be at least one bed.').max(10, 'There can be no more than 10 beds.'),
    singleBeds: z.number().min(0, 'There can be no less than 0 single beds.').max(20, 'There can be no more than 20 single beds.'),
    ac: z.boolean(),
    wifi: z.boolean(),
    garage: z.boolean(),
    type: z.string().refine(value => value === '1' || value === '2', {
        message: 'Type must be either "1" or "2".',
        path: ['type'],
    }),
    beachDistance: z.number().min(50, 'There can be no less than 50 meters to the beach.').max(20000, 'There can be no more than 20000 meters to the beach.'),
    state: z.string(),
    balneario: z.string(),
    neighborhood: z.string(),
    pictures: z.string(),
});

export type PropertyDto = z.infer<typeof propertySchema>;
