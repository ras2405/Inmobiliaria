import path from "path";
import fs from "fs";
import { AlertDto } from "../schemas/alert";
import { SensorValueDto } from "../schemas/sensorValue";
import { findSensorReturnPath } from "./sensorsService";
import { sensorData } from "../config/sensorLoader";

type SensorKeys = Exclude<keyof SensorValueDto, 'id'>;

export const checkAlerts = async (sensor: SensorValueDto) => {
    const alerts: AlertDto[] = [];
    Object.keys(sensor).forEach(measurement => {
        if (measurement != 'id') {
            const key = measurement as SensorKeys;
            const sensorData = sensor[key];

            if (sensorData && typeof sensorData === 'object' && 'Alerta' in sensorData) {
                const value = (sensorData as AlertDto).value;
                // const alertRegex = new RegExp((sensorData as AlertDto).Alert);

                getRegex(measurement).then(alertRegex => {
                    if (alertRegex.test(value)) {
                        getPriority(measurement).then(priority => {
                            alerts.push({
                                id: sensor.id,
                                measurement: measurement,
                                value: value,
                                priority: priority
                            });
                        });
                    }
                });
            }
        }
    });
    return alerts;
};

export const getPriority = async (measurement: string) => {
    const priorityMap: { [key: string]: number; } = {
        'Temperatura': 1,
        'HumedadAmbiente': 2,
    };
    return (priorityMap[measurement] as number) || 5;
};

export const getRegex = async (measurement: string) => {
    const rules: { [key: string]: string; } = {
        'Temperatura': '^[0-9]{2}$',
        'HumedadAmbiente': '^[0-9]{2}$',
    };
    return new RegExp(rules[measurement]);
};

// export const getRulesPath = async (sensorId: string) => {
//     const sensorPath = await findSensorReturnPath(sensorId);
//     const SENSORS_FOLDER_PATH = path.resolve(__dirname, '../config');
//     const rulesPath = path.resolve(SENSORS_FOLDER_PATH, sensorPath);
//     const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf-8'));
//     return rules;
// };

// export const alerts = sensorData.flatMap((sensor: SensorValueDto) => checkAlerts(sensor)); // REVISARRRR
