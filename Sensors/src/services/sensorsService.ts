import Sensor from "../models/Sensor";
import { SensorDto } from "../schemas/sensor";

export const createSensor = async (sensorDto: SensorDto) => {
    if (!sensorDto) throw Error('Body vacío');
    let sensor = { ...sensorDto };
    return await Sensor.create(sensor);
};
