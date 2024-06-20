import { NextFunction, Request, Response } from 'express';
import * as reportsService from '../services/reportsService';
import { EarningsDto } from '../schemas/earnings';


export const getEarnings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.propertyId);
        const earningsDto: EarningsDto = {
            startDate: new Date(req.query.startDate as string),
            endDate: new Date(req.query.endDate as string),
            propertyId: id
        };
        
        const earnings = await reportsService.getEarnings(earningsDto);
        res.status(200).json({
            status: 'success',
            data: earnings
        });
    } catch (error) {
        next(error);
    }
};

function parseDate(date: string | Date): Date {
    const parsedDate = new Date(date);
    return parsedDate;
}
