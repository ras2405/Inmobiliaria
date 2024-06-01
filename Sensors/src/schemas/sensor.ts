import { z } from "zod";

export const sensorSchema = z.object({
    id: z.string(),
    description: z.string().max(200, 'Description must be less than 200 characters.'),
    series: z.string().min(45, 'The series must be exactly 45 characters.').max(45, 'The series must be exactly 45 characters.'),
    brand: z.string().max(50, 'Brand must be less than 50 characters.'),
    address: z.string().max(1000, 'Address must be less than 1000 characters.'),
    date: z.date(),
    type: z.string(),
    observableProperties: z.array(z.string())
});

export type SensorDto = z.infer<typeof sensorSchema>;
