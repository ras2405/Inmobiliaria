import { z } from "zod";

export const sensorValueSchema = z.object({
    id: z.string().max(15, 'Id must be less than 15 characters.'),
    // temperature?: z.number(),
    // humidity
    // etc
});

export type SensorValueDto = z.infer<typeof sensorValueSchema>;
