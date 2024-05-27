import { Request, Response } from 'express';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
    const { currentMail, currentPassword } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: currentMail,
                password: currentPassword
            }
        });

        if (!user) return res.status(400).json({ message: 'Mail o contraseña incorrectos' });

        res.status(200).json({ message: 'Login correcto' });
    } catch (error: any) { // SACAR ANY
        res.status(400).json({ message: 'Error al loguearse', error: Error(error) });
    }
};
