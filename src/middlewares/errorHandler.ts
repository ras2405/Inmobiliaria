import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../exceptions/CustomError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            details: err.details
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            details: []
        });
    }
};
