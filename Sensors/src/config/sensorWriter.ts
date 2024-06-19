import * as fs from 'fs';
import path from 'path';

export const saveSensorData = async (filePath: string, data: any): Promise<void> => {
    try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Sensor data successfully written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
        throw error;
    }
};
