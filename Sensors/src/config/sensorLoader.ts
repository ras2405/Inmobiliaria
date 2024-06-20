import * as fs from 'fs/promises';
import * as path from 'path';
import { NotFoundError } from '../exceptions/NotFountError';

export const loadSensorData = async (filePath: string) => {
    try {
        const resolvedPath = path.resolve(filePath);

        const fileExists = await fs.access(resolvedPath).then(() => true).catch(() => false);
        if (!fileExists) {
            throw new NotFoundError(`File not found: ${resolvedPath}`);
        }

        const sensorFiles = await fs.readFile(resolvedPath, 'utf-8');
        return JSON.parse(sensorFiles);
    } catch (error) {
        throw new NotFoundError('Sensor not found in the written path');
    }
};
