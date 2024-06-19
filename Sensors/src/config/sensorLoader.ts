import * as fs from 'fs';
import path from 'path';
import { NotFoundError } from '../exceptions/NotFountError';

export const loadSensorData = async (filePath: string) => {
    try {
        const sensorFiles = fs.readFileSync(filePath, 'utf-8');
        console.log("SENSOR FILES", sensorFiles);
        console.log("JSON PARSE", JSON.parse(sensorFiles));
        // return JSON.parse(sensorFiles);
        return sensorFiles;
    } catch (error) {
        throw new NotFoundError('Sensor not found in the written path');
    }
};
