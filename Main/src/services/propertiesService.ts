import { Property, PropertyCreationAttributes } from "../models/Property";
import { PropertySensor, PropertySensorCreationAttributes } from "../models/PropertySensor";
import { PropertyDto } from "../schemas/property";


export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findPropertyById = async (id: number) => {
    return await Property.findByPk(id);
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

export const assignSensor = async (propertyId: number, sensorId: string) => {
    const propertySensorData: PropertySensorCreationAttributes = {
        propertyId: propertyId,
        sensorId: sensorId
    };
    const propertySensor = PropertySensor.create(propertySensorData);
    return propertySensor;
};
