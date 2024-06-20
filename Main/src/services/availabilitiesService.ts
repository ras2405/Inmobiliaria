import { ForeignKeyConstraintError, Op } from "sequelize";
import { BadRequestError } from "../exceptions/BadRequestError";
import { NotFoundError } from "../exceptions/NotFoundError";
import { Availability } from "../models/Availability";
import { AvailabilityDto } from "../schemas/availability";
import { Property } from "../models/Property";
import { PaymentStatus } from "../constants/payments";

export const createAvailability = async (availabilityDto: AvailabilityDto) => {
    try {
        const property = await Property.findByPk(availabilityDto.propertyId);
        if (property?.status !== PaymentStatus.ACTIVE) {
            throw new BadRequestError("No active payment for this property");
        }

        const existingAvailabilities = await findExistingAvailabilities(availabilityDto);

        if (existingAvailabilities.length > 0) {
            const conflictingAvailabilityId = existingAvailabilities[0].get('id');
            const errorMessage = `Overlap with an existing availability (ID: ${conflictingAvailabilityId}).`;
            throw new BadRequestError(errorMessage);
        }

        const availability = await Availability.create(availabilityDto);

        return availability;
    } catch (error: unknown) {
        if (error instanceof ForeignKeyConstraintError) {
            throw new NotFoundError("Property not found");
        }
        throw error;
    }
};

export const deleteAvailability = async (id: number) => {
    try {
        const availability = await Availability.findByPk(id);

        if (!availability) throw new NotFoundError("Availability not found");

        await availability.destroy();
    } catch (error) {
        throw error;
    }
};

const findExistingAvailabilities = async (availabilityDto: AvailabilityDto) => {
    const { propertyId, startDate, endDate } = availabilityDto;
    return await Availability.findAll({
        where: {
            propertyId,
            ...getOverlappingConditions(startDate, endDate)
        }
    });
};

const getOverlappingConditions = (startDate: Date, endDate: Date) => ({
    [Op.or]: [
        { startDate: { [Op.between]: [startDate, endDate] } },
        { endDate: { [Op.between]: [startDate, endDate] } },
        {
            [Op.and]: [
                { startDate: { [Op.lte]: startDate } },
                { endDate: { [Op.gte]: endDate } }
            ]
        },
        {
            [Op.and]: [
                { startDate: { [Op.gte]: startDate } },
                { endDate: { [Op.lte]: endDate } }
            ]
        }
    ]
});
