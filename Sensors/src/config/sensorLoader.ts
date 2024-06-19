import * as fs from 'fs';
import path from 'path';

export const loadSensorData = async (dir: string) => {
    const sensorFiles = fs.readdirSync(dir).filter(file => file.endsWith('.json'));
    return sensorFiles.map(file => {
        const filePath = path.join(dir, file);
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    });
};

// export const sensorData = loadSensorData('../../../files');// REVISAR DONDE SE TENDRIA QUE LLAMAR
