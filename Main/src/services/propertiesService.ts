import axios from "axios";
import { Property, PropertyCreationAttributes } from "../models/Property";
import { PayDto } from "../schemas/pay";
import { PropertyDto } from "../schemas/property";
import { BadRequestError } from "../exceptions/BadRequestError";
import { ServiceError } from "../exceptions/ServiceError";
import { PaymentCallbackDto } from "../schemas/paymentCallback";
import { PaymentStatus } from "../constants/payments";

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
        status: PaymentStatus.PENDING
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
        if (property.status === PaymentStatus.ACTIVE) {
            throw new BadRequestError('An active payment already exists');
        }
        if (property.status === PaymentStatus.CANCELLED) {
            throw new BadRequestError('Cancelled due to non-payment');
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
    if (paymentCallbackDto.status === 'success') {
        return await Property.update(
            { status: PaymentStatus.ACTIVE },
            { where: { id: paymentCallbackDto.propertyId } }
        );
    }
    return null;
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(','),
        status: PaymentStatus.ACTIVE
    };

    return await Property.update(propertyData, { where: { id } });
};
