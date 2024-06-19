import { NotFoundError } from "../exceptions/NotFountError";
import Sensor from "../models/Sensor";
import { SensorDto } from "../schemas/sensor";

export const createSensor = async (sensorDto: SensorDto) => {
    return await Sensor.create(sensorDto);
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
