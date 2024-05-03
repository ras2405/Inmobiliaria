import { Request, Response } from 'express';
// import { getErrorMessage } from '../utils/handleError';
import * as propertyService from '../services/propertyService';

// Obtener todos los properties
export const getProperties = async (req: Request, res: Response) => {
    try {      
        const properties = await propertyService.findAllProperties();
        res.status(200).json(properties);
    } catch (error: any) { // SACAR ANY
        res.status(400).json({ message: 'Error al obtener las Propiedades', error: Error(error) });
    }
};

// Obtener un property por su ID
export const getProperty = async (req: Request, res: Response) => {
    try {
        const property = await propertyService.findPropertyById(parseInt(req.params.id));
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error: any) { // SACAR ANY
        res.status(400).json({ message: 'Error al buscar la propiedad', error: Error(error) });
    }
};

// Crear una nueva Propiedad
export const createProperty = async (req: Request, res: Response) => {
    try {
        const property = await propertyService.createProperty(req.body);
        res.status(201).json(property);
    } catch (error: any) { // SACAR ANY
        res.status(400).json({ message: 'Error al crear la propiedad', error: Error(error) });
    }
};

// Actualizar una propiedad existente
export const updateProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await propertyService.updateProperty(parseInt(id), req.body);

        if (updated[0] === 1) { // Sequelize update devuelve un array con el número de filas afectadas
            res.status(200).json({ message: 'Propiedad actualizada' });
        } else {
            res.status(404).json({ message: 'Propiedad no encontrada' });
        }
    } catch (error: any) { // SACAR ANY
        res.status(400).json({ message: 'Error al actualizar la Propiedad', error: Error(error)});
    }
};