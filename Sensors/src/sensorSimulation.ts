import path from "path";
import { SensorValueDto, sensorValueSchema } from "./schemas/sensorValue";
import axios from 'axios';
import { saveSensorData } from "./config/sensorWriter";
import { loadSensorData } from "./config/sensorLoader";

let intervalId: NodeJS.Timeout | null = null;
let requestRatePerMinute: number = 0;
let sensors: string[] = [];

export const simConstructor = async (rate: number, sensorsList: string[]) => {
    requestRatePerMinute = rate;
    sensors = sensorsList;
};

export const getUpdatedValue = (value: string | number) => {
    if (typeof value === 'number') {
        return randomNumber();
    }
    return randomBool();
};

export const randomBool = () => (Math.random() > 0.5 ? "true" : "false");
export const randomNumber = () => {
    const num = Math.random() * 100;
    return Math.round(num * 10) / 10;
};

export const generateSensorData = (sensorId: string, existingSensorData?: Partial<SensorValueDto>) => {

    return {
        id: sensorId,
        ...(existingSensorData?.humidity && {
            humidity: {
                ...existingSensorData.humidity,
                value: getUpdatedValue(existingSensorData.humidity.value)
            }
        }),
        ...(existingSensorData?.temperature && {
            temperature: {
                ...existingSensorData.temperature,
                value: getUpdatedValue(existingSensorData.temperature.value)
            }
        }),
        ...(existingSensorData?.electricity && {
            electricity: {
                ...existingSensorData.electricity,
                value: getUpdatedValue(existingSensorData.electricity.value)
            }
        }),
        ...(existingSensorData?.doorLock && {
            doorLock: {
                ...existingSensorData.doorLock,
                value: getUpdatedValue(existingSensorData.doorLock.value)
            }
        }),
        ...(existingSensorData?.windowLock && {
            windowLock: {
                ...existingSensorData.windowLock,
                value: getUpdatedValue(existingSensorData.windowLock.value)
            }
        }),
        ...(existingSensorData?.water && {
            water: {
                ...existingSensorData.water,
                value: getUpdatedValue(existingSensorData.water.value)
            }
        }),
        ...(existingSensorData?.gas && {
            gas: {
                ...existingSensorData.gas,
                value: getUpdatedValue(existingSensorData.gas.value)
            }
        }),
        ...(existingSensorData?.smoke && {
            smoke: {
                ...existingSensorData.smoke,
                value: getUpdatedValue(existingSensorData.smoke.value)
            }
        })
    };
};

export const start = async () => {
    if (intervalId) {
        console.info("Simulator is already running");
        return;
    } else {
        console.info("Starting Sensor Simulator...");
    }

    const interval = (60 / requestRatePerMinute) * 1000;
    intervalId = setInterval(async () => {
        for (const sensorId of sensors) {
            const filePath = path.resolve(__dirname, `../../files/${sensorId}.json`);
            try {
                const currentFile = await loadSensorData(filePath);
                const fileData = sensorValueSchema.parse(currentFile);
                const data = generateSensorData(sensorId, fileData);
                const validatedData = sensorValueSchema.parse(data);
                await saveSensorData(validatedData, `${sensorId}.json`);

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

export const startSimulation = async () => {
    try {
        const sensors = await axios.get('http://localhost:3002/api/sensors');
        const sensorsId = sensors.data.data.map((sensor: any) => sensor.toString());;

        await simConstructor(12, sensorsId);
        await start();
    } catch (error) {
        console.error("Failed to start simulation:", error);
    }
};
