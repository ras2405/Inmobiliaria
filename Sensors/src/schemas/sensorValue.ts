import { z } from "zod";

export const sensorValueSchema = z.object({
    id: z.string({ message: 'Id must be a string' }),

    humidity: z.object({
        unit: z.enum(['percentage', 'boolean'], { message: "Unit must be a 'percentage' or a 'boolean' " }).optional().default('percentage'),
        value: z.union([z.enum(['true', 'false']), z.number()]),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    })
        .optional(),

    temperature: z.object({
        unit: z.enum(['celsius', 'farhenheit', 'boolean'], { message: "Unit must be a 'celsius', a 'farhenheit' or a 'boolean' " }).optional().default('celsius'),
        value: z.union([z.enum(['true', 'false']), z.number()]),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    })
        .optional(),

    electricity: z.object({
        unit: z.enum(['watt', 'boolean'], { message: "Unit must be a 'watt' or a 'boolean' " }).optional().default('watt'),
        value: z.union([z.enum(['true', 'false']), z.number()]),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    }).optional(),

    doorLock: z.object({
        unit: z.literal('boolean', { message: "Unit must be a 'boolean' " }),
        value: z.enum(['true', 'false']),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    }).optional(),

    windowLock: z.object({
        unit: z.literal('boolean', { message: "Unit must be a 'boolean' " }),
        value: z.enum(['true', 'false']),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    }).optional(),

    water: z.object({
        unit: z.enum(['liters', 'boolean'], { message: "unit must be 'liters' or 'boolean'" }).optional().default('liters'),
        value: z.union([z.enum(['true', 'false']), z.number()]),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    }).optional(),

    gas: z.object({
        unit: z.enum(['celsius', 'farhenheit', 'percentage', 'boolean'],
            { message: "Unit must be a 'celsius', a 'farhenheit', 'percentage' or a 'boolean' " }).optional().default('boolean'),
        value: z.union([z.enum(['true', 'false']), z.number()]),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    }).optional(),

    smoke: z.object({
        unit: z.enum(['percentage', 'boolean'], { message: "unit must be a 'percentage' or a 'boolean'" }).optional().default('boolean'),
        value: z.union([z.enum(['true', 'false']), z.number()]),
        regex: z.string().optional().refine((val) => {
            if (val === undefined) return true;
            try {
                new RegExp(val);
                return true;
            } catch (e) {
                return false;
            }
        }, {
            message: 'regex must be a regular valid expression'
        }).default('No regex')
    }).optional()
});

export type SensorValueDto = z.infer<typeof sensorValueSchema>;
