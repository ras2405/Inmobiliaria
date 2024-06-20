import { parse } from "date-fns";
import { format,toZonedTime } from "date-fns-tz";

export function addDaysToDate(date: Date, days: number): Date {
    const date1copy = new Date(date);
    date1copy.setDate(date1copy.getDate() + days);
    return date1copy;
}

export function getTodayDate(): Date {

    const timeZone = 'America/Montevideo';
    const now = new Date();
    const zonedDate = toZonedTime(now, timeZone);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd', { timeZone });
    const date = parse(formattedDate, 'yyyy-MM-dd', new Date());

    return date;
}

export function parseDate(date: string | Date): Date {
    const parsedDate = new Date(date);
    return parsedDate;
}

export function isOneDayLater(date1: Date, date2: Date): boolean {
    const date1copy = new Date(date1);
    const date2copy = new Date(date2);

    date1copy.setDate(date1copy.getDate() + 1);

    return date1copy.toDateString() === date2copy.toDateString();
}
