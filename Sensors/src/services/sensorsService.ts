import path from "path";
import { loadSensorData } from "../config/sensorLoader";
import { NotFoundError } from "../exceptions/NotFountError";
import Sensor from "../models/Sensor";
import { SensorDto } from "../schemas/sensor";
import { sensorValueSchema } from "../schemas/sensorValue";
import { saveSensorData } from "../config/sensorWriter";

export const createSensor = async (sensorDto: SensorDto) => {
    try {
        const currentFile = loadSensorData(path.resolve(sensorDto.observableProperties));

        console.log("DESPUES DE BUSCAR PATH");
        const fileData = sensorValueSchema.parse(currentFile);
        console.log("ANTES DE CAMBIAR PATH");

        const filePath = path.resolve(__dirname, `../../files/${sensorDto.id}.json`);
        await saveSensorData(filePath, fileData);

        console.log("DESPUES DE CAMBIAR PATH");
        return await Sensor.create(sensorDto);
    } catch (error) {
        throw error;
    }

};

export const findSensorById = async (sensorId: string) => {
    try {
        const sensor = await Sensor.findOne({ id: sensorId });
        if (!sensor) throw new NotFoundError('Sensor not found');
        return sensor;
    } catch (error) {
        throw error;
    }
};

export const findSensorReturnPath = async (sensorId: string) => {
    try {
        const sensor = await Sensor.findOne({ id: sensorId });
        if (!sensor) throw new NotFoundError('Sensor not found');
        return sensor.observableProperties;
    }
    catch (error) {
        throw error;
    }
};

export const findAllSensors = async () => {
    return await Sensor.find();
};
