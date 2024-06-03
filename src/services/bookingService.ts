import { Booking } from "../models/Booking";
import { BookingDto } from "../schemas/booking";


export const createBooking = async (bookingDto: BookingDto) => {
    if (!bookingDto) throw Error("Dto vacío");
    let booking = { ...bookingDto };
    return await Booking.create(booking);
};

export const updateBookingStatus = async (id: number, bookingDto: BookingDto) => {
    throw Error("Not implemented");
};
