import path from 'path';
import { Rules } from '../config/rules'; // Ajusta la ruta según tu estructura de archivos
import fs from 'fs';
import { SensorDto } from '../schemas/sensor';

export const checkValueType = async (observableProperties: string, value: any) => {
    // const rules = Rules[sensor.type]?.Alert;

    // if (!rules) {
    //     return null;
    // }

    // for (const key in value) {
    //     if (rules[key]) {
    //         const regex = new RegExp(rules[key]);
    //         if (!regex.test(value[key])) {
    //             return key;
    //         }
    //     }
    // }

    // return null;
};

export const checkTemperatureValue = async (observableProperties: string, value: number) => {
    // const rule = Rules[sensorType]?.Alert;
    const SENSORS_FOLDER_PATH = path.resolve(__dirname, '../config');
    const jsonPath = observableProperties;
    const rulesPath = path.resolve(SENSORS_FOLDER_PATH, jsonPath);
    const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));

    if (!rules) {
        // return null;
    }

    const regex = new RegExp(rules.temperature.Alert);
    if (regex.test(value.toString())) {
        if (regex.exec(value.toString())?.groups) { //EMPROLIJAR
            const { cold, normal, hot, extreme } = regex.exec(value.toString())!.groups!;
            // if (cold) return 'cold';
            // if (normal) return 'normal';
            // if (hot) return 'hot';
            // if (extreme) return 'extreme';
        }
    }
};
