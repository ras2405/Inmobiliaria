import { NextFunction, Request, Response } from 'express';
import * as bookingsService from '../services/bookingsService';
import { PayDto } from '../schemas/pay';
import { PaymentCallbackDto } from '../schemas/paymentCallback';
import { BookingFilterDto } from '../schemas/bookingFilter';
import { BookingMailDto } from '../schemas/bookingIdMail'
import { RefundDto } from '../schemas/refundSchema';

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

export const initiatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payDto: PayDto = req.body;
        payDto.id = parseInt(req.params.id);

        await bookingsService.initiatePayment(payDto);
        res.status(200).json({
            message: 'Payment initiation successful'
        });
    } catch (error) {
        next(error);
    }
};

export const paymentCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentCallbackDto: PaymentCallbackDto = req.body;
        paymentCallbackDto.id = parseInt(req.params.id);

        await bookingsService.paymentCallback(req.body);
        res.status(200).json({
            message: 'Callback received'
        });
    } catch (error) {
        next(error);
    }
};

export const initiateRefund = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refundDto: RefundDto = req.body;
        refundDto.id = parseInt(req.params.id);

        await bookingsService.initiateRefund(refundDto);
        res.status(200).json({
            message: 'Refund initiation successful'
        });
    } catch (error) {
        next(error);
    }
};

export const refundCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentCallbackDto: PaymentCallbackDto = req.body;
        paymentCallbackDto.id = parseInt(req.params.id);

        await bookingsService.refundCallback(req.body);
        res.status(200).json({
            message: 'Callback received'
        });
    } catch (error) {
        next(error);
    }
};

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingFilterDto: BookingFilterDto = req.query;
        const bookings = await bookingsService.getBookingsAsAdminOperator(bookingFilterDto);
        res.status(200).json({
            status: 'success',
            data: bookings
        });
    } catch (error) {
        next(error);
    }
};

export const getOwnBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingMailDto: BookingMailDto = req.body;
        const id = parseInt(req.params.id);
        const booking = await bookingsService.getOwnBooking(id,bookingMailDto);
        res.status(200).json({
            status: 'success',
            data: booking
        });
    } catch (error) {
        next(error);
    }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingMailDto: BookingMailDto = req.body;
        const id = parseInt(req.params.id);
        const booking = await bookingsService.cancelBooking(id,bookingMailDto);
        res.status(200).json({
            status: 'success',
            data: booking
        });
    } catch (error) {
        next(error);
    }
};
