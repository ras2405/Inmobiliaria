import path from "path";
import { SensorValueDto, sensorValueSchema } from "./schemas/sensorValue";
import axios from 'axios';
import { saveSensorData } from "../src/config/sensorWriter";
import { loadSensorData } from "./config/sensorLoader";

let intervalId: NodeJS.Timeout | null = null;
let requestRatePerMinute: number = 0;
const sensors: string[] = [];

export const simConstructor = async (requestRatePerMinute: number, sensors: string[]) => {
    requestRatePerMinute = requestRatePerMinute;
    sensors = sensors;
};

export const getUpdatedValue = (value: string | number) => {
    if (typeof value === 'number') {
        return randomNumber(value);
    }
    return randomBool();
};

export const randomBool = () => (Math.random() > 0.5 ? "true" : "false");
export const randomNumber = (max: number) => Math.random() * max;

export const generateSensorData = async (sensorId: string, existingSensorData?: Partial<SensorValueDto>) => {

    return {
        id: sensorId,
        ...(existingSensorData?.Humidity && {
            Humidity: {
                ...existingSensorData.Humidity,
                value: getUpdatedValue(existingSensorData.Humidity.value)
            }
        }),
        ...(existingSensorData?.Temperature && {
            Temperature: {
                ...existingSensorData.Temperature,
                value: getUpdatedValue(existingSensorData.Temperature.value)
            }
        }),
        ...(existingSensorData?.Electricity && {
            Electricity: {
                ...existingSensorData.Electricity,
                value: getUpdatedValue(existingSensorData.Electricity.value)
            }
        }),
        ...(existingSensorData?.DoorLock && {
            DoorLock: {
                ...existingSensorData.DoorLock,
                value: getUpdatedValue(existingSensorData.DoorLock.value)
            }
        }),
        ...(existingSensorData?.WindowLock && {
            WindowLock: {
                ...existingSensorData.WindowLock,
                value: getUpdatedValue(existingSensorData.WindowLock.value)
            }
        }),
        ...(existingSensorData?.Water && {
            Water: {
                ...existingSensorData.Water,
                value: getUpdatedValue(existingSensorData.Water.value)
            }
        }),
        ...(existingSensorData?.Gas && {
            Gas: {
                ...existingSensorData.Gas,
                value: getUpdatedValue(existingSensorData.Gas.value)
            }
        }),
        ...(existingSensorData?.Smoke && {
            Smoke: {
                ...existingSensorData.Smoke,
                value: getUpdatedValue(existingSensorData.Smoke.value)
            }
        })
    };
};

export const start = async () => {
    if (intervalId) {
        console.log("Simulator is already running");
        return;
    }

    const interval = (60 / requestRatePerMinute) * 1000;
    intervalId = setInterval(async () => {
        for (const sensorId of sensors) {
            const currentFile = loadSensorData(path.resolve(__dirname, `../../files/${sensorId}.json`));
            const filePath = path.resolve(__dirname, `../../files/${sensorId}.json`);
            try {
                const fileData = sensorValueSchema.parse(currentFile);
                const data = generateSensorData(sensorId, fileData);
                await saveSensorData(filePath, JSON.stringify(data));

            } catch (error) {
                console.error(`Error writing data to ${filePath}:`, error);
            }
        }
    }, interval);
};

export const stop = async () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};

export const setRequestRatePerMinute = async (rate: number) => {
    requestRatePerMinute = rate;
    if (intervalId) {
        stop();
        start();
    }
};

export const setSensors = async (sensors: string[]) => {
    sensors = sensors;
};

export const startSimulation = async () => {
    const sensors = await axios.get('http://localhost:3002/api/sensors');
    await simConstructor(5, sensors.data.map((sensor: any) => sensor.id));
    await start();
};
