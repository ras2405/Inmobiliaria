import * as fs from 'fs';
import path from 'path';

export const saveSensorData = async (filePath: string, data: any): Promise<void> => {
    try {
        const dir = path.dirname(filePath);
        // Crea el directorio si no existe
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Escribe los datos en el archivo
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Data successfully written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
        throw error;
    }
};
