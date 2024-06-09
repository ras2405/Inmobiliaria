import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../middlewares/loginConfig';
import { User } from '../models/User';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { mail, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                mail: mail,
                password: password
            }
        });

        if (!user) return res.status(400).json({ message: 'Mail o contraseña incorrectos' });

        const token = jwt.sign({ mail }, secretKey, { expiresIn: '2h' });

        const returnedUser = {
            mail: mail,
            token: token,
        };

        await axios.post('http://localhost:3003/api/saveUserData', returnedUser);

        res.status(200).json({
            message: 'Login correcto',
            data: returnedUser
        });
    } catch (error) {
        console.log('error:', error);
        next(error);
    }
};
