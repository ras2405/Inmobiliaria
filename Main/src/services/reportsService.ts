import { Op, col, fn } from "sequelize";
import { Availability } from "../models/Availability";
import { Booking } from "../models/Booking";
import { Property } from "../models/Property";
import { EarningsDto } from "../schemas/earnings";

export const getEarnings = async (earningsDto: EarningsDto) => {

    let properties = await Property.findAll({
        include: [
            {
                model: Availability,
                as: 'availabilities',
                where: {
                    endDate: {
                        [Op.gt]: earningsDto.startDate
                    },
                    startDate: {
                        [Op.lt]: earningsDto.endDate
                    }
                },
                required: false
            },
            {
                model: Booking,
                as: 'bookings',
                attributes: [
                    'id', 'document', 'documentType', 'name', 'surname', 
                    'mail', 'phone', 'country', 'state', 'status', 
                    'adults', 'kids', 'propertyId', 'startDate', 'endDate', 
                    'createdAt',
                    [fn('SUM', col('bookings.price')), 'totalPrice']
                ],
                where: {
                    endDate: {
                        [Op.gt]: earningsDto.startDate
                    },
                    startDate: {
                        [Op.lt]: earningsDto.endDate
                    }
                },
                required: false
            }
        ],
        group: ['Property.id', 'bookings.id', 'bookings.document', 'bookings.documentType', 'bookings.name', 'bookings.surname', 'bookings.mail', 'bookings.phone', 'bookings.country', 'bookings.state', 'bookings.status', 'bookings.adults', 'bookings.kids', 'bookings.propertyId', 'bookings.startDate', 'bookings.endDate', 'bookings.createdAt']
    });

    return properties;

}
