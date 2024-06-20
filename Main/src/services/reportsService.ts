import { Op, col, fn } from "sequelize";
import { Availability } from "../models/Availability";
import { Booking, BookingInstance } from "../models/Booking";
import { Property } from "../models/Property";
import { EarningsDto } from "../schemas/earnings";
import { BookingStatus } from "../constants/payments";
import { NotFoundError } from "../exceptions/NotFoundError";

export const getEarnings = async (earningsDto: EarningsDto,propertyId:number) => {
    console.log(propertyId);
    console.log(earningsDto.startDate);
    console.log(earningsDto.endDate);
    let property = await Property.findOne({
        where: { 
            id: propertyId
        },
        include: [
            {
                model: Booking,
                as: 'bookings',
                where: {
                    endDate: {
                        [Op.gt]: earningsDto.startDate
                    },
                    startDate: {
                        [Op.lt]: earningsDto.endDate
                    },
                    status: BookingStatus.ACTIVE
                },
                required: false
            }
        ]
    });
    
    if(!property){
        throw new NotFoundError("Property not found");
    }
    console.log("HOLA");
    const bookings: BookingInstance[] = property?.bookings ?? [];
    let total = 0;
    if(bookings){
        total = bookings.reduce((sum, booking) =>{
            if(!booking || !booking.price){
                return sum}
            return sum + booking.price
        }, 0);
    }

    return {property, total};

}
