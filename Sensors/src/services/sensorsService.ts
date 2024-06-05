import Sensor from "../models/Sensor";
import { SensorDto } from "../schemas/sensor";

export const createSensor = async (sensorDto: SensorDto) => {
    return await Sensor.create(sensorDto);
};
