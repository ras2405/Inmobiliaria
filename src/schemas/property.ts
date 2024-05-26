import { z } from 'zod';

export const propertySchema = z.object({
    id: z.number(),
    name: z.string(),
    adults: z.number(),
    kids: z.number(),
    beds: z.number(),
    singleBeds: z.number(),
    ac: z.boolean(),
    wifi: z.boolean(),
    garage: z.boolean(),
    type: z.number().min(1).max(2),
    beachDistance: z.number(),
    state: z.string(),
    balneario: z.string(),
    neighborhood: z.string(),
    pictures: z.string(),
});

export type PropertyDto = z.infer<typeof propertySchema>;
