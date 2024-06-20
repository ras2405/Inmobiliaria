import { z } from 'zod';

export const propertySchema = z.object({
    name: z.string(),
    adults: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 1 && val <= 20, { message: 'There must be at least one adult and no more than 20 adults.' }),
    kids: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0 && val <= 10, { message: 'There can be no less than 0 kids and no more than 10 kids.' }),
    beds: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 1 && val <= 10, { message: 'There must be at least one bed and no more than 10 beds.' }),
    singleBeds: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0 && val <= 20, { message: 'There can be no less than 0 single beds and no more than 20 single beds.' }),
    ac: z.preprocess((val) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return val;
    }, z.boolean().refine(val => typeof val === 'boolean', { message: 'AC must be "true" or "false".' })),
    wifi: z.preprocess((val) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return val;
    }, z.boolean().refine(val => typeof val === 'boolean', { message: 'WiFi must be "true" or "false".' })),
    garage: z.preprocess((val) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return val;
    }, z.boolean().refine(val => typeof val === 'boolean', { message: 'Garage must be "true" or "false".' })),
    type: z.string().refine(value => value === '1' || value === '2', {
        message: 'Type must be either "1" or "2".',
        path: ['type'],
    }),
    beachDistance: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 50 && val <= 20000, { message: 'There can be no less than 50 meters to the beach and no more than 20000 meters to the beach.' }),
    state: z.string(),
    balneario: z.string(),
    neighborhood: z.string(),
    price: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 1, { message: 'The price must be a positive number.' }),
});

export const extendedPropertySchema = propertySchema.extend({
    pictures: z.array(z.string()),
});

export type PropertyDto = z.infer<typeof extendedPropertySchema>;
