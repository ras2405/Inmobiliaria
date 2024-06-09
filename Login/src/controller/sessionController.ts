import { NextFunction, Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { mail, token } = req.body;
    try {
        const session = await sessionService.createLogin(req.body);
        res.status(200).json({
            message: 'Sesion correcta',
            data: session
        });
    } catch (error) {
        console.log('error:', error);
        next(error);
    }
};
