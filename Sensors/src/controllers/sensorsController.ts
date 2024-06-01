import { NextFunction, Request, Response } from "express";
import * as sensorsService from '../services/sensorsService';

export const createSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sensor = await sensorsService.createSensor(req.body);
        res.status(201).json({
            status: 'success',
            data: sensor
        });
    } catch (error) {
        next(error);
    }
};
