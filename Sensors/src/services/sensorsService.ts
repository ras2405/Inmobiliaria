import Sensor from "../models/Sensor";
import { SensorDto } from "../schemas/sensor";

export const createSensor = async (sensorDto: SensorDto) => {
    if (!sensorDto) throw Error('Body vacío');
    console.log("largo del series con el zod: ", sensorDto.series.length);
    let sensor = { ...sensorDto };
    console.log("largo del series para el modelo de mongoose:", sensor.series.length);
    return await Sensor.create(sensor);
};
