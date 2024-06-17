import { z } from "zod";

export const propertySensorSchema = z.object({
    sensorId: z.string().max(15, 'sensorId must be less than 15 characters.'),
});

export type PropertySensorDto = z.infer<typeof propertySensorSchema>;
