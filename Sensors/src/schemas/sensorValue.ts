import { z } from "zod";

export const sensorValueSchema = z.object({
    id: z.string(),

    Humidity: z
        .object({
            unit: z.enum(['percentage', 'boolean']).optional().default('percentage'),
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

    Temperature: z
        .object({
            unit: z.enum(['celsius', 'farhenheit', 'boolean']).optional().default('celsius'),
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

    Electricity: z.object({
        unit: z.enum(['watt', 'boolean']).optional().default('watt'),
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

    DoorLock: z.object({
        unit: z.literal('boolean'),
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

    WindowLock: z.object({
        unit: z.literal('boolean'),
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

    Water: z.object({
        unit: z.enum(['liters', 'boolean']).optional().default('liters'),
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

    Gas: z.object({
        unit: z.enum(['temperature', 'percentage', 'boolean']).optional().default('boolean'),
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

    Smoke: z.object({
        unit: z.enum(['percentage', 'boolean']).optional().default('boolean'),
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
