import { AlertDto } from "../schemas/alert";
import { SensorValueDto } from "../schemas/sensorValue";
import { getPriority, getRegex } from "./alertProperties";

export type SensorKeys = Exclude<keyof SensorValueDto, 'id'>;

export const checkAlerts = async (sensor: SensorValueDto) => {
    const alerts: AlertDto[] = [];
    Object.keys(sensor).forEach(measurement => {
        if (measurement != 'id') {
            const key = measurement as SensorKeys;

            evaluateRegex(measurement, key, sensor, alerts);
        }
    });
    return alerts;
};

export const isBoolOrNumber = (value: string | number | undefined) => {
    if (typeof value === 'string') {
        return (value === 'true' ? 1 : 0);
    }
    return value;
};

export const evaluateRegex = async (measurement: string, key: SensorKeys, sensor: SensorValueDto, alerts: AlertDto[]) => {
    let value = sensor[key]?.value;
    const regex = sensor[key]?.regex;
    const unit = sensor[key]?.unit;

    value = isBoolOrNumber(value);

    if (regex && regex !== 'No regex' && value) {
        const regexExp = new RegExp(regex as string);
        testRegex(measurement, value, regexExp, alerts, sensor.id);
    } else if (value) {
        getRegex(unit).then(alertRegex => {
            testRegex(measurement, value, alertRegex, alerts, sensor.id);
        });
    }
};

export const testRegex = (measurement: string, value: string | number, regexExp: RegExp, alerts: AlertDto[], id: string) => {
    if (!regexExp.test(value.toString())) {
        getPriority(measurement).then(priority => {
            alerts.push({
                id: id,
                measurement: measurement,
                value: value as number,
                priority: priority,
                message: `${measurement} out of range. Value: ${value}`,
            });
        });
    }
};
