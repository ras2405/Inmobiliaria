import { BadRequestError } from "../exceptions/BadRequestError";
import { NotFoundError } from "../exceptions/NotFoundError";
import { AvailabilityInstance } from "../models/Availability";
import { Booking, BookingInstance } from "../models/Booking";
import { BookingDto } from "../schemas/booking";
import { findPropertyAvailabilities } from "../services/availabilitiesService";
import { findPropertyById } from "./propertiesService";

export const createBooking = async (bookingDto: BookingDto) => {

    try{
        let property = await findPropertyById(bookingDto.propertyId);

        if(!property){
            throw new NotFoundError("Incorrect property id");
        }
        
        if(bookingDto.adults > property.adults){
            throw new BadRequestError("Property doesn't have enough capacity for that many adults");

        }else if(bookingDto.kids > property.kids){
            throw new BadRequestError("Property doesn't have enough capacity for that many kids");
        }

        const propertyAvailabilities = findPropertyAvailabilities(bookingDto.propertyId);
        const propertyBookings = findPropertyBookings(bookingDto.propertyId);
        if(!isBookingInAvailableDates(bookingDto, await propertyAvailabilities, await propertyBookings)){
            throw new BadRequestError("The period of time selected is not available for booking");
        } 

        let returnBooking = await Booking.create(bookingDto);
        if(returnBooking){
            notifyBookingToAdminAndOwner(bookingDto);
        }
        return returnBooking;
    }catch(error){
        console.log(error)
        throw error;
    }
};

export const updateBookingStatus = async (id: number, bookingDto: BookingDto) => {
    throw Error("Not implemented");
};

const notifyBookingToAdminAndOwner = async (bookingDto: BookingDto) => {
    console.log("Notificar a Admin y a Owner");
}

export const findPropertyBookings = async (id:number) => {
    return await Booking.findAll({
        where: {
            propertyId : id
        }
    });
};


const isBookingInAvailableDates = (booking:BookingDto,ranges:AvailabilityInstance[],existingBookings:BookingInstance[]) => {
    let available = false;

    console.log("Lengt booking ranges");
    console.log(ranges.length);
    let cleanAvailabilityRanges : AvailabilityInstance[];
    if(ranges.length >= 2){
        cleanAvailabilityRanges = joinAdyacentDateRanges(ranges);
    }else{
        cleanAvailabilityRanges = ranges;
    }
    
    ranges.forEach((range) => {
        console.log(range);
        let bookingIsIncludedInRange = ((booking.startDate >= range.startDate)
                                    && (booking.endDate <= range.endDate));
        if(bookingIsIncludedInRange){
            console.log("bookingIsIncludedInRange ESTO ACTIVA AVAILABLE = TRUE SI OCURRE");
            console.log(bookingIsIncludedInRange);
            available = true;
        }
        
    });

    if(!available){
        return false;
    }

    let cleanBookingRanges;
    console.log("Lengt booking ranges");
    console.log(existingBookings.length);
    if(existingBookings.length >= 2){
        cleanBookingRanges = joinAdyacentDateRanges(existingBookings);
    }else{
        cleanBookingRanges = existingBookings;
    }

    cleanBookingRanges.forEach((range) => {
        console.log(range);
        let bookingIntersectsRange = ((booking.startDate <= range.startDate && booking.endDate >= range.startDate)
                                    || (booking.startDate <= range.endDate && booking.endDate >= range.endDate)
                                    || (booking.startDate >= range.startDate && booking.endDate <= range.endDate)
                                    || (booking.startDate <= range.startDate && booking.endDate >= range.endDate));
        if(bookingIntersectsRange){
            console.log("bookingIntersectsRange ESTO ACTIVA AVAILABLE = FALSE SI OCURRE");
            console.log(bookingIntersectsRange);
            available = false;
        }    
    });
    
    return available;
}

const joinAdyacentDateRanges = (ranges:AvailabilityInstance[] | BookingInstance[]) => {

    let sortedRanges = sortAvailabilities(ranges);
    let joinedRanges = [];

    for(let i = sortedRanges.length-1; i > 0; i-- ){
        if(isOneDayLater(sortedRanges[i-1].endDate, sortedRanges[i].startDate)){
            sortedRanges[i].startDate = sortedRanges[i-1].startDate;
            sortedRanges[i-1].endDate = sortedRanges[i].endDate;
        }else{
            joinedRanges.push(sortedRanges[i]);
        }
    } 
    joinedRanges.push(sortedRanges[0]);
    
    return joinedRanges;
}  

const sortAvailabilities = (ranges:AvailabilityInstance[] | BookingInstance[]) => {
    let swapped = true;
    while(swapped === true){
        swapped = false;
        for (let i = 0; i < ranges.length-1; i++) {
            if(compareDates(ranges[i].startDate, ranges[i+1].startDate) == -1){
                let aux = ranges[i];
                ranges[i] = ranges[i+1];
                ranges[i+1] = aux;
                swapped = true                
            }
        }
    }

    return ranges;
}

const compareDates = (date1:Date, date2:Date): number => {
    if(date1 <= date2){
        return 1
    }else{
        return -1
    }
}

function isOneDayLater(date1: Date, date2: Date): boolean {
    const date1copy = new Date(date1);
    const date2copy = new Date(date2);

    date1copy.setDate(date1copy.getDate() + 1);

    return date1copy.toDateString() === date2copy.toDateString();
}


