import { ForeignKeyConstraintError } from "sequelize";
import { NotFoundError } from "../exceptions/NotFountError";
import { Availability } from "../models/Availability";
import { AvailabilityDto } from "../schemas/availability";

export const createAvailability = async (availabilityDto: AvailabilityDto) => {
    try {
        const availability = await Availability.create(availabilityDto);
        return availability;
    } catch (error: unknown) {
        if (error instanceof ForeignKeyConstraintError) {
            throw new NotFoundError("Property not found");
        }
        throw error;
    }
};
