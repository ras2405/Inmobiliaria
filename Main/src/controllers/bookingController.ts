import { NextFunction, Request, Response } from 'express';
import * as bookingsService from '../services/bookingsService';
import { BookingFilterDto } from '../schemas/bookingFilter';

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

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingFilterDto: BookingFilterDto = req.query;
        const bookings = await bookingsService.getBookingsAsAdminOperator(bookingFilterDto);
        res.status(201).json({
            status: 'success',
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};
