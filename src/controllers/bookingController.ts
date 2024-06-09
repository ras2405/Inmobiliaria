import { NextFunction, Request, Response } from 'express';
import * as bookingsService from '../services/bookingsService';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await bookingsService.createBooking(req.body);
        res.status(201).json({
            status: 'success',
            data: booking
        });
    } catch (error) {
        next(error);
    }
};
