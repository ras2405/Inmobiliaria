import axios from "axios";
import { Op } from "sequelize";
import { BadRequestError } from "../exceptions/BadRequestError";
import { NotFoundError } from "../exceptions/NotFoundError";
import { Availability, AvailabilityInstance } from "../models/Availability";
import { Booking, BookingInstance } from "../models/Booking";
import { Property } from "../models/Property";
import { BookingDto } from "../schemas/booking";
import { ServiceError } from "../exceptions/ServiceError";
import { PayDto } from "../schemas/pay";
import { BookingStatus, PaymentStatus } from "../constants/payments";
import { PaymentCallbackDto } from "../schemas/paymentCallback";
import { BookingFilterDto } from "../schemas/bookingFilter";
import { filterByString, filterByDifferentNumber } from "../utils/filterFunctions";
import { sendEmail } from "../utils/sendEmail";
import { BookingMailDto } from "../schemas/bookingIdMail";
import { addDaysToDate, getTodayDate, parseDate } from "../utils/dateUtils";
import { daysAllowedToCancelBooking } from "../constants/refund";

export const createBooking = async (bookingDto: BookingDto) => {

    try {
        const property = await Property.findOne({
            where: {
                id: bookingDto.propertyId,
            },
            include: [{
                model: Availability,
                as: 'availabilities'
            },
            {
                model: Booking,
                as: 'bookings',
                where: {
                    status: {
                        [Op.ne]: PaymentStatus.CANCELLED
                    }
                }
            }]
        });

        if (!property) {
            throw new NotFoundError("Incorrect property id");
        }
        if (property.status !== PaymentStatus.ACTIVE) {
            throw new BadRequestError("Property not available for booking");
        }
        if (bookingDto.adults > property.adults) {
            throw new BadRequestError("Property doesn't have enough capacity for that many adults");
        }
        if (bookingDto.kids > property.kids) {
            throw new BadRequestError("Property doesn't have enough capacity for that many kids");
        }

        const availabilities: AvailabilityInstance[] = property?.availabilities ?? [];
        const bookings: BookingInstance[] = property?.bookings ?? [];

        if (!isBookingInAvailableDates(bookingDto, availabilities, bookings)) {
            throw new BadRequestError("The period of time selected is not available for booking");
        }

        const returnBooking = await Booking.create(bookingDto);
        if (returnBooking) {
            notifyBookingToAdminAndOwner(bookingDto);
        }

        sendEmail(
            'ADMIN & OWNER: New booking',
            `A new booking has been made for property ${property.name}`
        );

        return returnBooking;
    } catch (error) {
        throw error;
    }
};

export const initiatePayment = async (payDto: PayDto) => {
    try {
        const booking = await Booking.findByPk(payDto.id);
        if (!booking) {
            throw new NotFoundError('Booking not found');
        }
        if (booking.status === BookingStatus.ACTIVE) {
            throw new BadRequestError('An active payment already exists');
        }
        if (booking.status === BookingStatus.CANCELLED) {
            throw new BadRequestError('Cancelled due to non-payment');
        }

        const paymentData = {
            amount: payDto.amount,
            cardNumber: payDto.cardNumber,
            callback: `${process.env.APP_URL_MAIN}/api/bookings/${payDto.id}/payment-callback`,
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
    try {
        if (paymentCallbackDto.status === 'success') {
            const bookingUpdate = await Booking.update(
                { status: BookingStatus.ACTIVE },
                { where: { id: paymentCallbackDto.id } }
            );

            sendEmail(
                'ADMIN & OWNER: Payment success',
                `The payment for booking ${paymentCallbackDto.id} has been successful`
            );

            return bookingUpdate;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

const notifyBookingToAdminAndOwner = async (bookingDto: BookingDto) => {
    console.log("Notificar a Admin y a Owner");
};

export const findPropertyBookings = async (id: number) => {
    return await Booking.findAll({
        where: {
            propertyId: id
        }
    });
};

export const getBookingsAsAdminOperator = async (bookingFilterDto: BookingFilterDto) => {
    let bookings = await getBookingsFilteredByRange(bookingFilterDto);

    if (!bookings) {
        throw new NotFoundError("No properties were found");
    }

    bookings = bookings.filter(booking => matchesFilter(booking, bookingFilterDto));

    return bookings;
};

export const getOwnBooking = async (bookingId:number,bookingMailDto: BookingMailDto) => {
    if(bookingId <= 0){
        throw new BadRequestError("Id must be a positive number");
    }

    let bookings = await Booking.findAll({
        where: {
            id: bookingId,
            mail: bookingMailDto.mail
        }
    });

    if (!bookings) {
        throw new NotFoundError("Booking not found");
    }

    return bookings;
};

export const cancelBooking = async (bookingId:number, bookingMailDto:BookingMailDto) => {

    if(bookingId <= 0){
        throw new BadRequestError("Id must be a positive number");
    }

    let booking = await Booking.findOne({
        where: {
            id: bookingId,
            mail: bookingMailDto.mail,
            status: {
                [Op.or]: [BookingStatus.ACTIVE, BookingStatus.PENDING]
            }
        }
    });

    if(!booking){
        throw new NotFoundError("Booking not found");
    }
    if(!booking.createdAt){
        throw new ServiceError("Something went wrong checking the date in which the booking was created");
    }

    const tooLateToCancel = (getTodayDate() >= addDaysToDate(booking.createdAt,daysAllowedToCancelBooking))
                            || (getTodayDate() >= parseDate(booking.startDate));
    if(tooLateToCancel){
        throw new BadRequestError("You can't cancel this booking. The allowed period of time to cancel your booking has ended.");
    }else{
        booking.status = BookingStatus.CANCELLED_BY_TENANT;
        await booking.save();
    }

    return booking;
};


const isBookingInAvailableDates = (booking: BookingDto, ranges: AvailabilityInstance[], existingBookings: BookingInstance[]) => {
    let available = false;

    let cleanAvailabilityRanges: AvailabilityInstance[];
    if (ranges.length >= 2) {
        cleanAvailabilityRanges = joinAdyacentDateRanges(ranges);
    } else {
        cleanAvailabilityRanges = ranges;
    }

    cleanAvailabilityRanges.forEach((range) => {
        const bookingIsIncludedInRange = ((booking.startDate >= range.startDate)
            && (booking.endDate <= range.endDate));
        if (bookingIsIncludedInRange) {
            available = true;
        }
    });

    if (!available) {
        return false;
    }

    let cleanBookingRanges;
    if (existingBookings.length >= 2) {
        cleanBookingRanges = joinAdyacentDateRanges(existingBookings);
    } else {
        cleanBookingRanges = existingBookings;
    }

    cleanBookingRanges.forEach((range) => {
        const bookingIntersectsRange = ((booking.startDate <= range.startDate && booking.endDate >= range.startDate)
            || (booking.startDate <= range.endDate && booking.endDate >= range.endDate)
            || (booking.startDate >= range.startDate && booking.endDate <= range.endDate)
            || (booking.startDate <= range.startDate && booking.endDate >= range.endDate));
        if (bookingIntersectsRange) {
            available = false;
        }
    });

    return available;
};

const joinAdyacentDateRanges = (ranges: AvailabilityInstance[] | BookingInstance[]) => {

    let sortedRanges = sortDateRanges(ranges);
    let joinedRanges = [];

    for (let i = sortedRanges.length - 1; i > 0; i--) {
        if (isOneDayLater(sortedRanges[i - 1].endDate, sortedRanges[i].startDate)) {
            sortedRanges[i].startDate = sortedRanges[i - 1].startDate;
            sortedRanges[i - 1].endDate = sortedRanges[i].endDate;
        } else {
            joinedRanges.push(sortedRanges[i]);
        }
    }
    joinedRanges.push(sortedRanges[0]);

    return joinedRanges;
};

const sortDateRanges = (ranges: AvailabilityInstance[] | BookingInstance[]) => {
    let swapped = true;
    while (swapped === true) {
        swapped = false;
        for (let i = 0; i < ranges.length - 1; i++) {
            if (ranges[i].startDate > ranges[i + 1].startDate) {
                let aux = ranges[i];
                ranges[i] = ranges[i + 1];
                ranges[i + 1] = aux;
                swapped = true;
            }
        }
    }

    return ranges;
};

function isOneDayLater(date1: Date, date2: Date): boolean {
    const date1copy = new Date(date1);
    const date2copy = new Date(date2);

    date1copy.setDate(date1copy.getDate() + 1);

    return date1copy.toDateString() === date2copy.toDateString();
}

const getBookingsFilteredByRange = async (filter: BookingFilterDto): Promise<BookingInstance[]> => {
    let properties;

    if (!filter.startDate && !filter.endDate) {
        properties = await Booking.findAll();

    } else if (filter.startDate && !filter.endDate) {
        properties = await Booking.findAll({
            where: {
                endDate: {
                    [Op.gte]: filter.startDate
                }
            }

        });
    } else if (!filter.startDate && filter.endDate) {
        properties = await Booking.findAll({
            where: {
                startDate: {
                    [Op.lte]: filter.endDate
                }
            }

        });
    } else if (filter.startDate && filter.endDate) {
        if (filter.startDate > filter.endDate) {
            throw new BadRequestError("Date range selected is invalid");
        }

        properties = await Booking.findAll({
            where: {
                endDate: {
                    [Op.gte]: filter.startDate
                },
                startDate: {
                    [Op.lte]: filter.endDate
                }
            }

        });
    } else {
        throw new BadRequestError("Date range selected is invalid");
    }

    return await properties;
};

function matchesFilter(booking: BookingInstance, filter: BookingFilterDto): boolean {
    return (
        filterByDifferentNumber(booking.propertyId, filter.propertyId) &&
        filterByString(booking.mail, filter.mail) &&
        filterByString(booking.name, filter.name) &&
        filterByString(booking.surname, filter.surname) &&
        filterByString(booking.status, filter.status)
    );
}

