import { PropertyDto } from "../dtos/propertyDto";
import { Property } from "../models/Property";

export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findPropertyById = async (id: number) => {
    return await Property.findByPk(id);    
};

export const createProperty = async (propertyDto: PropertyDto) => {
    if (!propertyDto) throw Error("Dto vacío"); 
    let property = {...propertyDto};
    return await Property.create(property);
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    if (!propertyDto) throw Error("Dto vacío");
    return await Property.update(propertyDto, { where: { id } });
};