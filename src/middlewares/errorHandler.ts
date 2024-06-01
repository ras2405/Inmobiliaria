import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../exceptions/CustomError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(err.details.length > 0 && { details: err.details })
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            details: []
        });
    }
};
