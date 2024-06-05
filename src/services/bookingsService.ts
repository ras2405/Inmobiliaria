import { PropertyDto } from "../dtos/PropertyDto";
import { BadRequestError } from "../exceptions/BadRequestError";
import { InternalServerError } from "../exceptions/InternalServerError";
import { NotFoundError } from "../exceptions/NotFoundError";
import { Booking } from "../models/Booking";
import { BookingDto } from "../schemas/booking";
import { findPropertyById } from "./propertiesService";

export const createBooking = async (bookingDto: BookingDto) => {
        let property = await findPropertyById(bookingDto.propertyId);
        if(!property){
            throw new NotFoundError("Incorrect property id");
        }
        
        let propertyCasted = (property as unknown as PropertyDto);
        if(bookingDto.adults > propertyCasted.adults){
            throw new BadRequestError("Property doesn't have enough capacity for that many adults");

        }else if(bookingDto.kids > propertyCasted.kids){
            throw new BadRequestError("Property doesn't have enough capacity for that many kids");
        }

        let returnBooking = await Booking.create(bookingDto);
        if(returnBooking){
            notifyBookingToAdminAndOwner(bookingDto);
            return returnBooking;
        }else{
            throw new InternalServerError("Booking could not be created");
        }
};

export const updateBookingStatus = async (id: number, bookingDto: BookingDto) => {
    throw Error("Not implemented");
};

const notifyBookingToAdminAndOwner = async (bookingDto: BookingDto) => {
    console.log("Notificar a Admin y a Owner");
}
