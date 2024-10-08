import { NextFunction, Request, Response } from 'express';
import * as propertiesService from '../services/propertiesService';
import { PropertyDto } from '../schemas/property';
import { PayDto } from '../schemas/pay';
import { PaymentCallbackDto } from '../schemas/paymentCallback';
import { PropertyFilterDto } from '../schemas/propertyFilter';
import { PropertySensorDto, propertySensorSchema } from '../schemas/propertySensor';

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyFilterDto: PropertyFilterDto = req.query;
        const properties = await propertiesService.findAllPropertiesFiltered(propertyFilterDto);
        res.status(200).json({
            status: 'success',
            data: properties
        });
    } catch (error) {
        next(error);
    }
};

export const getProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const property = await propertiesService.findPropertyById(parseInt(req.params.id));
        res.status(200).json({
            status: 'success',
            data: property
        });
    } catch (error) {
        next(error);
    }
};

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyDto: PropertyDto = req.body;
        const files = req.files as Express.Multer.File[];

        propertyDto.pictures = files.map(file => file.path);

        const property = await propertiesService.createProperty(propertyDto);

        res.status(201).json({
            status: 'success',
            data: property
        });
    } catch (error) {
        next(error);
    }
};

export const initiatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payDto: PayDto = req.body;
        payDto.id = parseInt(req.params.id);

        await propertiesService.initiatePayment(payDto);

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

        await propertiesService.paymentCallback(paymentCallbackDto);
        res.status(200).json({
            message: 'Callback received'
        });
    } catch (error) {
        next(error);
    }
};

export const assignSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyId = parseInt(req.params.id);
        const propertySensorDto: PropertySensorDto = req.body;

        const propertySensor = await propertiesService.assignSensor(propertyId, propertySensorDto);

        res.status(200).json({
            status: 'success',
            data: propertySensor
        });
    } catch (error) {
        next(error);
    }
};

export const getSensors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyId = parseInt(req.params.id);
        const sensors = await propertiesService.getSensors(propertyId);

        res.status(200).json({
            status: 'success',
            message: 'Click on the route to see the sensors of the property.',
            data: sensors
        });
    } catch (error) {
        next(error);
    }
};
