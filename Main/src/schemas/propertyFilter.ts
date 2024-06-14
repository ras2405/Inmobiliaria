import { z } from 'zod';

export const propertyFilterSchema = z.object({
    adults: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 1 && val <= 20, { message: 'There must be at least one adult and no more than 20 adults.' }).optional(),
    kids: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0 && val <= 10, { message: 'There can be no less than 0 kids and no more than 10 kids.' }).optional(),
    beds: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 1 && val <= 10, { message: 'There must be at least one bed and no more than 10 beds.' }).optional(),
    singleBeds: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 0 && val <= 20, { message: 'There can be no less than 0 single beds and no more than 20 single beds.' }).optional(),
    ac: z.preprocess((val) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return val;
    }, z.boolean().refine(val => typeof val === 'boolean', { message: 'AC must be "true" or "false".' })).optional(),
    wifi: z.preprocess((val) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return val;
    }, z.boolean().refine(val => typeof val === 'boolean', { message: 'WiFi must be "true" or "false".' })).optional(),
    garage: z.preprocess((val) => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return val;
    }, z.boolean().refine(val => typeof val === 'boolean', { message: 'Garage must be "true" or "false".' })).optional(),
    type: z.string().refine(value => value === '1' || value === '2', {
        message: 'Type must be either "1" or "2".',
        path: ['type'],
    }).optional(),
    beachDistance: z.string()
        .transform((val) => parseInt(val))
        .refine((val) => val >= 50 && val <= 20000, { message: 'There can be no less than 50 meters to the beach and no more than 20000 meters to the beach.' }).optional(),
    state: z.string().optional(),
    balneario: z.string().optional(),
    neighborhood: z.string().optional(),                    
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)).optional(),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
    .transform((date) => new Date(date)).optional(),
});

export type PropertyFilterDto = z.infer<typeof propertyFilterSchema>;
