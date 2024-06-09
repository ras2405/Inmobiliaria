import { NextFunction, Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await sessionService.createLogin(req.body);
        res.status(200).json({
            message: 'Sesión correcta',
            data: session
        });
    } catch (error) {
        next(error);
    }
};
