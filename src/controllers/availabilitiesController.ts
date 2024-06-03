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

export const deleteAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await availabilityService.deleteAvailability(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
