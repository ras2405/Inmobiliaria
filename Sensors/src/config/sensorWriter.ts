import * as fs from 'fs';
import path from 'path';
import { SensorValueDto } from '../schemas/sensorValue';

const directoryPath = path.join(__dirname, '../../../files');

export const saveSensorData = async (data: SensorValueDto, fileName: string): Promise<void> => {
    try {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const filePath = path.join(directoryPath, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Sensor data successfully written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing data to ${directoryPath}:`, error);
        throw error;
    }
};
