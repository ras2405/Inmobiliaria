import { z } from "zod";

export const PropertySensorSchema = z.object({
    propertyId: z.number(),
    sensorId: z.string()
});
