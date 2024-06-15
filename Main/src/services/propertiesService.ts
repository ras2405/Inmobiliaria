import axios from "axios";
import { Property, PropertyCreationAttributes } from "../models/Property";
import { PayDto } from "../schemas/pay";
import { PropertyDto } from "../schemas/property";
import { BadRequestError } from "../exceptions/BadRequestError";
import { ServiceError } from "../exceptions/ServiceError";
import { PaymentCallbackDto } from "../schemas/paymentCallback";

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
        if (property.status !== 'pending payment') {
            throw new BadRequestError('An active payment already exists');
        }

        const paymentData = {
            amount: payDto.amount,
            cardNumber: payDto.cardNumber,
            callback: `${process.env.APP_URL_MAIN}/api/properties/${payDto.propertyId}/payment-callback`,
        };

        axios.post(
            `${process.env.APP_URL_PAYMENT}/api/payments`,
            paymentData,
            { headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new ServiceError('Payment initiation failed');
        } else {
            throw error;
        }
    }
};

export const paymentCallback = async (paymentCallbackDto: PaymentCallbackDto) => {
    console.log(paymentCallbackDto.status);
    if (paymentCallbackDto.status === 'success') {
        return await Property.update(
            { status: 'active' },
            { where: { id: paymentCallbackDto.propertyId } }
        );
    }
    return null;
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(','),
        status: 'active'
    };

    return await Property.update(propertyData, { where: { id } });
};
