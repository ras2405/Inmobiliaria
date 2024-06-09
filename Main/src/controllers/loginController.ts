import { NextFunction, Request, Response } from 'express';
import * as loginService from '../services/loginService';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const login = await loginService.login(req.body);
        res.status(200).json({
            message: 'Login correcto',
            data: login
        });
    } catch (error) {
        next(error);
    }
};
