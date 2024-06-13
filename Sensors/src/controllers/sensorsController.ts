import { NextFunction, Request, Response } from "express";
import * as sensorsService from '../services/sensorsService';

export const createSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sensor = await sensorsService.createSensor(req.body);
        const filteredSensor = {
            id: sensor.id,
            description: sensor.description,
            series: sensor.series,
            brand: sensor.brand,
            address: sensor.address,
            date: sensor.date,
            type: sensor.type,
            observableProperties: sensor.observableProperties
        };
        res.status(201).json({
            status: 'success',
            data: filteredSensor
        });
    } catch (error) {
        next(error);
    }
};

export const getSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const sensor = await sensorsService.findSensorById(id);

        res.status(200).json({
            status: 'success',
            data: sensor
        });
    } catch (error) {
        next(error);
    }
};
