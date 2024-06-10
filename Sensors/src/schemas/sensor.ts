import { z } from "zod";

export const sensorSchema = z.object({
    id: z.string().max(15, 'Id must be less than 15 characters.'),
    description: z.string().max(200, 'Description must be less than 200 characters.'),
    series: z.string().length(45, 'The series must be exactly 45 alphanumeric characters.'),
    brand: z.string().max(50, 'Brand must be less than 50 characters.'),
    address: z.string().max(1000, 'Address must be less than 1000 characters.'),
    date: z.string().date(),
    type: z.string(),
    observableProperties: z.array(
        z.string().max(1000, 'Path must be less than 1000 characters.')
    ).nonempty('There must be at least one observable property.')
});

export type SensorDto = z.infer<typeof sensorSchema>;
