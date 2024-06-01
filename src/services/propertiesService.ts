import { Property } from "../models/Property";
import { PropertyDto } from "../schemas/property";

export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findPropertyById = async (id: number) => {
    return await Property.findByPk(id);
};

export const createProperty = async (propertyDto: PropertyDto) => {
    return await Property.create(propertyDto);
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    if (!propertyDto) throw Error("Dto vacío");
    return await Property.update(propertyDto, { where: { id } });
};
