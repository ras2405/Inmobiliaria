import { AlertDto } from "../schemas/alert";
import { SensorValueDto } from "../schemas/sensorValue";
import { getPriority, getRegex } from "./alertProperties";

type SensorKeys = Exclude<keyof SensorValueDto, 'id'>;

export const checkAlerts = async (sensor: SensorValueDto) => {
    const alerts: AlertDto[] = [];
    Object.keys(sensor).forEach(measurement => {
        if (measurement != 'id') {
            const key = measurement as SensorKeys;
            const value = sensor[key];

            if (value && typeof value === 'number') {
                getRegex(measurement).then(alertRegex => {
                    if (!alertRegex.test(value.toString())) {
                        getPriority(measurement).then(priority => {
                            alerts.push({
                                id: sensor.id,
                                measurement: measurement,
                                value: value as number,
                                priority: priority,
                                message: `${measurement} out of range. Value: ${value}`,
                            });
                        });
                    }
                });
            }
        }
    });
    return alerts;
};
