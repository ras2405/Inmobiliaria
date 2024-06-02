import { ForeignKeyConstraintError, Op } from "sequelize";
import { BadRequestError } from "../exceptions/BadRequestError";
import { NotFoundError } from "../exceptions/NotFountError";
import { Availability } from "../models/Availability";
import { AvailabilityDto } from "../schemas/availability";

// TODO: Si tengo una del 14/6 al 18/6, me deja agregar del 18/6 al 20/6
// TODO: Mejorar implementación
// TODO: Hacer delete
// TODO: Hacer get desde property
export const createAvailability = async (availabilityDto: AvailabilityDto) => {
    try {
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
