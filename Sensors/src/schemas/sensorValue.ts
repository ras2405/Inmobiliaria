import { z } from "zod";

export const sensorValueSchema = z.object({
    id: z.string().max(15, 'Id must be less than 15 characters.'),
    temperature: z.number().optional(),
    humidity: z.number().optional()
});

export type SensorValueDto = z.infer<typeof sensorValueSchema>;
