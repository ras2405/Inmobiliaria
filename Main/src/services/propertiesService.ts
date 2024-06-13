import axios from "axios";
import { BadRequestError } from "../exceptions/BadRequestError";
import { Property, PropertyCreationAttributes } from "../models/Property";
import { PropertySensor, PropertySensorCreationAttributes } from "../models/PropertySensor";
import { PropertyDto } from "../schemas/property";
import { PropertySensorDto } from "../schemas/propertySensor";

export const findAllProperties = async () => {
    const properties = await Property.findAll();
    if (!properties) {
        throw new BadRequestError('No properties found');
    }
    return properties;
};

export const findPropertyById = async (id: number) => {
    const property = await Property.findByPk(id);
    if (!property) {
        throw new BadRequestError('Property not found');
    }
    return property;
};

export const createProperty = async (propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(',')
    };

    const property = await Property.create(propertyData);

    return property;
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(',')
    };

    return await Property.update(propertyData, { where: { id } });
};

export const assignSensor = async (propertyId: number, propSensorDto: PropertySensorDto) => {
    try {
        await axios.get(`http://localhost:3002/api/sensors/${propSensorDto.sensorId}`);
        await findPropertyById(propertyId);
    } catch (error) {
        throw new BadRequestError('Invalid sensor or property id');
    }

    const propertySensorData: PropertySensorCreationAttributes = {
        propertyId: propertyId,
        sensorId: propSensorDto.sensorId
    };
    const propertySensor = await PropertySensor.create(propertySensorData);
    return propertySensor;
};
