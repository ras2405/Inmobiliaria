import axios from "axios";
import { Property, PropertyCreationAttributes } from "../models/Property";
import { PayDto } from "../schemas/pay";
import { PropertyDto } from "../schemas/property";
import { BadRequestError } from "../exceptions/BadRequestError";

export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findPropertyById = async (id: number) => {
    return await Property.findByPk(id);
};

export const createProperty = async (propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(','),
        status: 'pending payment'
    };

    const property = await Property.create(propertyData);

    return property;
};

export const initiatePayment = async (payDto: PayDto) => {
    try {
        const property = await Property.findByPk(payDto.propertyId);
        if (!property) {
            throw new BadRequestError('Property not found');
        }

        const paymentData = {
            id: payDto.propertyId,
            monto: payDto.amount,
            tarjeta: payDto.cardNumber,
            callback: `${process.env.APP_URL_MAIN}/api/properties/${payDto.propertyId}/payment-callback`,
        };

        await axios.post(`${process.env.APP_URL_PAYMENT}/api/process-payment`, paymentData);
    } catch (error) {
        throw new Error('Payment initiation failed');
    }
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(','),
        status: 'active'
    };

    return await Property.update(propertyData, { where: { id } });
};
