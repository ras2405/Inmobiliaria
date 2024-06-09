import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../middlewares/loginConfig';
import { User } from '../models/User';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { currentMail, currentPassword } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: currentMail,
                password: currentPassword
            }
        });

        const token = jwt.sign({ currentMail }, secretKey, { expiresIn: '2h' });
        res.json({ token });

        if (!user) return res.status(400).json({ message: 'Mail o contraseña incorrectos' });

        const returnedUser = {
            email: currentMail,
            token: token
        };

        // aca mandar al LoginService para que se guarde en su propia db externa

        res.status(200).json({
            message: 'Login correcto',
            data: returnedUser
        });
    } catch (error) {
        next(error);
    }
};
