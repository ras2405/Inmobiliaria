import axios from "axios";
import { Property, PropertyCreationAttributes, PropertyInstance } from "../models/Property";
import { PropertySensor, PropertySensorCreationAttributes } from "../models/PropertySensor";
import { PropertyDto } from "../schemas/property";
import { PropertySensorDto } from "../schemas/propertySensor";
import { NotFoundError } from "../exceptions/NotFoundError";
import { PropertyFilterDto } from "../schemas/propertyFilter";
import { Availability, AvailabilityInstance } from "../models/Availability";
import { Booking, BookingInstance } from "../models/Booking";
import { BadRequestError } from "../exceptions/BadRequestError";
import { format, toZonedTime } from 'date-fns-tz';
import { parse } from "date-fns";
import { Op } from "sequelize";
import { filterByBoolean, filterByString, filterByGreaterThan,filterByLessThan } from "../utils/filterFunctions";

export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findAllPropertiesFiltered = async (propertyFilter: PropertyFilterDto) => {
    let rangeDateEntered = true;
    const pageSize = 10;
    if(propertyFilter.page === undefined){ propertyFilter.page = 1;}

    if((!propertyFilter.startDate || !propertyFilter.endDate)){
        const todayDate = getTodayDate();
        propertyFilter.startDate = todayDate;
        propertyFilter.endDate = addDaysToDate(todayDate, 30);
        rangeDateEntered = false;
    }

    let properties = await Property.findAll({
        limit: pageSize,
        offset: (propertyFilter.page - 1) * pageSize,
        include: [
            {
                
                model: Availability,
                as: 'availabilities',
                attributes: ['startDate', 'endDate'],
                where: {
                    endDate: {
                        [Op.gt]: propertyFilter.startDate
                    },
                    startDate:{
                        [Op.lt]: propertyFilter.endDate
                    }
                },
                required: false
            },
            {
                model: Booking,
                as: 'bookings',
                attributes: ['startDate', 'endDate'],
                where: {
                    endDate: {
                        [Op.gt]: propertyFilter.startDate
                    },
                    startDate:{
                        [Op.lt]: propertyFilter.endDate
                    }
                },
                required: false
            }
        ]
    });
    
    if(!properties){
        throw new NotFoundError("No results found");
    }

    if(parseDate(propertyFilter.startDate) > parseDate(propertyFilter.endDate)){
        throw new BadRequestError("Invalid date range");
    } 

    if(rangeDateEntered){
        properties = properties.filter(property => matchesFilter(property, propertyFilter, rangeDateEntered));
    }

    return properties;
};

export const findPropertyById = async (id: number) => {
    const property = await Property.findByPk(id);
    if (!property) {
        throw new NotFoundError('Property not found');
    }
    return property;
};

export const createProperty = async (propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(',')
    };

    const property = await Property.create(propertyData);

    return property;
};

export const updateProperty = async (id: number, propertyDto: PropertyDto) => {
    const propertyData: PropertyCreationAttributes = {
        ...propertyDto,
        pictures: propertyDto.pictures.join(',')
    };

    return await Property.update(propertyData, { where: { id } });
};

export const assignSensor = async (propertyId: number, propSensorDto: PropertySensorDto) => {
    try {
        await axios.get(`http://localhost:3002/api/sensors/${propSensorDto.sensorId}`);
        await findPropertyById(propertyId);
    } catch (error) {
        throw new BadRequestError('Invalid sensor or property id');
    }

    try {
        const propertySensorData: PropertySensorCreationAttributes = {
            propertyId: propertyId,
            sensorId: propSensorDto.sensorId
        };
        await PropertySensor.create(propertySensorData);
    } catch (error) {
        throw new BadRequestError('Sensor already assigned to property');
    }
};

function matchesFilter (property:PropertyInstance,filter:PropertyFilterDto, dateRangesEntered:boolean):boolean{
    return (
        filterByLessThan(property.adults, filter.adults) &&
        filterByLessThan(property.kids, filter.kids) &&
        filterByLessThan(property.beds, filter.beds) &&
        filterByLessThan(property.singleBeds, filter.singleBeds) &&
        filterByBoolean(property.ac, filter.ac) &&
        filterByBoolean(property.wifi, filter.wifi) &&
        filterByBoolean(property.garage, filter.garage) &&
        filterByString(property.type, filter.type) &&
        filterByGreaterThan(property.beachDistance, filter.beachDistance) &&
        filterByString(property.state, filter.state) &&
        filterByString(property.balneario, filter.balneario) &&
        filterByString(property.neighborhood, filter.neighborhood) &&
        (dateRangesEntered ? 
            filterByDateRange(property, filter.startDate, filter.endDate)
            : true)
    );
}

function filterByDateRange(property:PropertyInstance,startDate?:Date,endDate?:Date):boolean{
    if(startDate === undefined || endDate === undefined){return true}


    const availabilities:AvailabilityInstance[] = property.availabilities ?? [];
    let availabilitiesCopy:AvailabilityInstance[] = availabilities.map(result => result.toJSON());

    const bookings:BookingInstance[] = property.bookings ?? [];
    let bookingsCopy:BookingInstance[] = bookings.map(result => result.toJSON());
    
    return (isWithinAvailabilityRange(availabilitiesCopy, parseDate(startDate), parseDate(endDate))
        && !intersectsWithBookings(bookingsCopy, parseDate(startDate), parseDate(endDate)));
}

function isWithinAvailabilityRange(ranges:AvailabilityInstance[],startDate:Date,endDate:Date){
    let isInRange = false; 

    let cleanAvailabilityRanges : AvailabilityInstance[];
    if(ranges.length >= 2){
        cleanAvailabilityRanges = joinAdyacentDateRanges(ranges);
    }else{
        cleanAvailabilityRanges = ranges;
    }

    cleanAvailabilityRanges.forEach((range) => {
        const isIncludedInRange = ((parseDate(startDate) >= parseDate(range.startDate))
                                        && (parseDate(endDate) <= parseDate(range.endDate)));
                                     
        if(isIncludedInRange){
            isInRange = true;
        }  
    });

    return isInRange;
}

function intersectsWithBookings(ranges:BookingInstance[],startDate:Date,endDate:Date){
    let intersects = false;
    
    let cleanBookingRanges;
    if(ranges.length >= 2){
        cleanBookingRanges = joinAdyacentDateRanges(ranges);
    }else{
        cleanBookingRanges = ranges;
    }

    cleanBookingRanges.forEach((bookingRange) => {
        const bookingIntersectsRange = ((startDate <= parseDate(bookingRange.startDate) && endDate >= parseDate(bookingRange.startDate))
                                    || (startDate <= parseDate(bookingRange.endDate) && endDate >= parseDate(bookingRange.endDate))
                                    || (startDate >= parseDate(bookingRange.startDate) && endDate <= parseDate(bookingRange.endDate))
                                    || (startDate <= parseDate(bookingRange.startDate) && endDate >= parseDate(bookingRange.endDate)));
        if(bookingIntersectsRange){
            intersects = true;
        }    
    });

    return intersects;
}

const joinAdyacentDateRanges = (ranges:AvailabilityInstance[] | BookingInstance[]) => {
    let sortedRanges = sortDateRanges(ranges);
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

const sortDateRanges = (ranges:AvailabilityInstance[] | BookingInstance[]) => {
    let swapped = true;
    while(swapped === true){
        swapped = false;
        for (let i = 0; i < ranges.length-1; i++) {
            if(ranges[i].startDate > ranges[i+1].startDate){
                let aux = ranges[i];
                ranges[i] = ranges[i+1];
                ranges[i+1] = aux;
                swapped = true                
            }
        }
    }

    return ranges;
}

function isOneDayLater(date1: Date, date2: Date): boolean {
    const date1copy = new Date(date1);
    const date2copy = new Date(date2);

    date1copy.setDate(date1copy.getDate() + 1);

    return date1copy.toDateString() === date2copy.toDateString();
}

function addDaysToDate(date:Date, days:number):Date{
    const date1copy = new Date(date);
    date1copy.setDate(date1copy.getDate() + days);
    return date1copy;
}

function getTodayDate():Date{
    
const timeZone = 'America/Montevideo';
const now = new Date();
const zonedDate = toZonedTime(now, timeZone);
const formattedDate = format(zonedDate, 'yyyy-MM-dd', { timeZone });
const date = parse(formattedDate, 'yyyy-MM-dd', new Date());

return date;
}

function parseDate(date:string|Date):Date{
    const parsedDate = new Date(date);
    return parsedDate;
}

function parseBool(value:string|boolean):boolean{
    if(typeof value === "string"){
        if(value.toLocaleLowerCase() === "true"){
            return true;
        }
        if(value.toLocaleLowerCase() === "false"){
            return false;
        } 
    }
    if(typeof value === "boolean"){
        return value;
    }  
    return false;
}
