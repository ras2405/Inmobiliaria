import * as fs from 'fs/promises';
import path from 'path';
import { NotFoundError } from '../exceptions/NotFountError';

export const loadSensorData = async (filePath: string) => {
    try {
        const sensorFiles = await fs.readFile(filePath, 'utf-8');
        console.log("JSON PARSE", JSON.parse(sensorFiles));
        return JSON.parse(sensorFiles);
    } catch (error) {
        throw new NotFoundError('Sensor not found in the written path');
    }
};
