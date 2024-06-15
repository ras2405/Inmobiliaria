import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { ValidationError } from '../exceptions/ValidationError';

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.query);
            req.query = result;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                next(new ValidationError(error));
            } else {
                next(error);
            }
        }
    };
};
