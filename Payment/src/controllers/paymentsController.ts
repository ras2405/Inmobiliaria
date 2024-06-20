import { NextFunction, Request, Response } from "express";
import * as paymentsService from "../services/paymentsServices";

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await paymentsService.createPayment(req.body);
        res.status(201).json({
            message: 'Payment successful'
        });
    } catch (error) {
        next(error);
    }
};

export const createRefund = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await paymentsService.createPayment(req.body);
        res.status(201).json({
            message: 'Refund successful'
        });
    } catch (error) {
        next(error);
    }
};
