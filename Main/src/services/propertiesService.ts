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

export const findAllProperties = async () => {
    return await Property.findAll();
};

export const findAllPropertiesFiltered = async (propertyFilter: PropertyFilterDto) => {
    let properties = await Property.findAll({
        include: [{
            model: Availability,
            as: 'availabilities'
        },
        {
            model: Booking,
            as: 'bookings',
        }]
    });

    if(!properties){
        throw new NotFoundError("No results found");
    }

    if((!propertyFilter.startDate || !propertyFilter.endDate)){
        const todayDate = getTodayDate();
        propertyFilter.startDate = todayDate;
        propertyFilter.endDate = addDaysToDate(todayDate, 30);
    }

    if(parseDate(propertyFilter.startDate) > parseDate(propertyFilter.endDate)){
        throw new BadRequestError("Invalid date range");
    } 
       
    properties = properties.filter(property => matchesFilter(property, propertyFilter));

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

function isWithinRange(ranges:AvailabilityInstance[],startDate:Date,endDate:Date){
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

const joinAdyacentDateRanges = (ranges:AvailabilityInstance[]) => {

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

const sortDateRanges = (ranges:AvailabilityInstance[]) => {
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

function matchesFilter (property:PropertyInstance,filter:PropertyFilterDto):boolean{

    if(filter.adults !== undefined){
        if(property.adults < Number(filter.adults)){
            return false;
        }
    }
    if(filter.kids !== undefined){
        if(property.kids < Number(filter.kids)){
            return false;
        }
    }
    if(filter.beds !== undefined){
        if(property.beds < Number(filter.beds)){
            return false;
        }
    }
    if(filter.singleBeds !== undefined){
        if(property.singleBeds < Number(filter.singleBeds)){
            return false;
        }
    }
    if(filter.ac !== undefined){
        if(property.ac != parseBool(filter.ac)){
            return false;
        }
    }
    if(filter.wifi !== undefined){
        if(property.wifi != parseBool(filter.wifi)){
            return false;
        }
    }
    if(filter.garage !== undefined){
        if(property.garage != parseBool(filter.garage)){
            return false;
        }
    }
    if(filter.type !== undefined){
        if(property.type != filter.type){
            return false;
        }
    }
    if(filter.beachDistance !== undefined){
        if(property.beachDistance > Number(filter.beachDistance)){
            return false;
        }
    }
    if(filter.state !== undefined){
        if(property.state != filter.state){
            return false;
        }
    }
    if(filter.balneario !== undefined){
        if(property.balneario != filter.balneario){
            return false;
        }
    }
    if(filter.neighborhood !== undefined){
        if(property.neighborhood != filter.neighborhood){
            return false;
        }
    }
    if(filter.startDate !== undefined && filter.endDate !== undefined){    
        if(!isWithinRange(property.availabilities??[],filter.startDate,filter.endDate)){
            return false;
        }
    }

    return true;
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

