import { z } from "zod";

export const PropertySensorSchema = z.object({
    propertyId: z.number(),
    sensorId: z.string().max(15, 'sensorId must be less than 15 characters.'),
});
