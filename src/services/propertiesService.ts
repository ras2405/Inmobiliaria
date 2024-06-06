import { PropertyDto as PropertyDtoOut } from "../dtos/PropertyDto";
import { Property } from "../models/Property";
import { PropertyDto } from "../schemas/property";


export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findPropertyById = async (id: number):Promise<PropertyDtoOut | null>  => {
    const property = await Property.findByPk(id);
    if (property) {
        return new PropertyDtoOut(property);
    }
    return null;
};

export const createProperty = async (propertyDto: PropertyDto): Promise<PropertyDtoOut | null> => {
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
