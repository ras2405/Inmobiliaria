import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../exceptions/CustomError';
import multer from 'multer';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(err.details.length > 0 && { details: err.details })
        });
    } else if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: 'error',
                message: 'The uploaded image exceeds the maximum allowed size of 500KB.'
            });
        }
    } else {
        console.error('>>> Failed Operation: ', err);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};
