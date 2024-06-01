import { NextFunction, Request, Response } from "express";
import * as availabilityService from "../services/availabilitiesService";

export const createAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const availability = await availabilityService.createAvailability(req.body);
        res.status(201).json({
            status: 'success',
            data: availability
        });
    } catch (error) {
        next(error);
    }
};
