import path from "path";
import { loadSensorData } from "../config/sensorLoader";
import { NotFoundError } from "../exceptions/NotFountError";
import Sensor from "../models/Sensor";
import { SensorDto } from "../schemas/sensor";
import { sensorValueSchema } from "../schemas/sensorValue";
import { saveSensorData } from "../config/sensorWriter";
import { BadRequestError } from "../exceptions/BadRequestError";

export const createSensor = async (sensorDto: SensorDto) => {
    try {
        await loadSensorData(path.resolve(sensorDto.observableProperties));
    } catch (error) {
        throw new BadRequestError("File not found in the provided path");
    }

    try {
        const currentFile = await loadSensorData(path.resolve(sensorDto.observableProperties));
        const fileData = sensorValueSchema.parse(currentFile);

        await saveSensorData(fileData, `${sensorDto.id}.json`);

        const sensorFullPath = path.resolve(__dirname, `../../files/${sensorDto.id}.json`);
        sensorDto.observableProperties = sensorFullPath;
        return await Sensor.create(sensorDto);
    } catch (error) {
        throw new BadRequestError('Formating error in the JSON file');
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
    const sensors = await Sensor.find({}, { id: 1, _id: 0 });
    return sensors.map(sensor => sensor.id);
};
