import { z } from "zod";

export const sensorSchema = z.object({
    id: z.string(),
    description: z.string().array().max(200, 'Description must be less than 200 characters.'),
    series: z.string().array().length(45, 'The series must be exactly 45 characters.'),
    brand: z.string().array().max(50, 'Brand must be less than 50 characters.'),
    address: z.string().array().max(1000, 'Address must be less than 1000 characters.'),
    date: z.date(),
    type: z.string(),
    observableProperties: z.string()// z.array(z.string())
});

export type SensorDto = z.infer<typeof sensorSchema>;
