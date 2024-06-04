import { ForeignKeyConstraintError } from "sequelize";
import { Booking } from "../models/Booking";
import { BookingDto } from "../schemas/booking";
import { PropertyDto } from "../schemas/property";
import { findPropertyById } from "./propertiesService";

export const createBooking = async (bookingDto: BookingDto) => {
    try {
        if (!bookingDto) throw Error("Dto vacío");
        let booking = { ...bookingDto };
        let propId :number;
        propId = booking.propertyId;
        let property = await findPropertyById(propId);
        if(property){
            let propertyCasted = (property as unknown as PropertyDto);
            if(booking.adults > propertyCasted.adults){
                throw new Error("Property doesn't have enough capacity for that many adults");

            }else if(booking.kids > propertyCasted.kids){
                throw new Error("Property doesn't have enough capacity for that many kids");
            }

            let returnBooking = await Booking.create(booking);
            if(returnBooking){
                notifyBookingToAdminAndOwner(booking);
                return returnBooking;
            }else{
                throw new Error("Booking could not be created");
            }
            
        }else{
            throw new Error("Incorrect property id");
        }
            
    }catch(error: unknown){
        if(error instanceof ForeignKeyConstraintError ){
            throw new Error("Incorrect property id");
        }
    }
};

export const updateBookingStatus = async (id: number, bookingDto: BookingDto) => {
    throw Error("Not implemented");
};

const notifyBookingToAdminAndOwner = async (bookingDto: BookingDto) => {
    console.log("Notificar a Admin y a Owner");
}
