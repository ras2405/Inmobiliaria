import { NextFunction, Request, Response } from 'express';
import * as propertiesService from '../services/propertiesService';
import { PropertyDto } from '../schemas/property';
import { PropertySensorDto, propertySensorSchema } from '../schemas/propertySensor';

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const properties = await propertiesService.findAllProperties();
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

export const updateProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await propertiesService.updateProperty(parseInt(id), req.body);

        if (updated[0] === 1) { // Sequelize update devuelve un array con el número de filas afectadas
            res.status(200).json({ message: 'Propiedad actualizada' });
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error: any) { // SACAR ANY
        res.status(400).json({ message: 'Error al actualizar la Propiedad', error: Error(error) });
    }
};

export const assignSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const propertyId = parseInt(req.params.id);
        // await getProperty(propertyId);
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
