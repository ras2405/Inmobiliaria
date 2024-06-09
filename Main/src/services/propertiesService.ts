import { PropertyDto as PropertyDtoOut } from "../dtos/PropertyDto";
import { Property } from "../models/Property";
import { PropertyDto } from "../schemas/property";


export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findPropertyById = async (id: number)  => {
    return await Property.findByPk(id);
};

export const createProperty = async (propertyDto: PropertyDto) => {
    const property = await Property.create(propertyDto);
    if (property) {
        return new PropertyDtoOut(property);
    }
    return property;
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    if (!propertyDto) throw Error("Dto vacío");
    return await Property.update(propertyDto, { where: { id } });
};
