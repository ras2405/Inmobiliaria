import axios from 'axios';
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../exceptions/BadRequestError";
import { secretKey } from '../middlewares/loginConfig';
import { User } from "../models/User";
import { LoginDto } from "../schemas/login";

export const login = async (loginDto: LoginDto) => {
    const user = await User.findOne({
        where: {
            mail: loginDto.mail,
            password: loginDto.password
        }
    });

    const mail = loginDto.mail;
    const errorMessage = 'Wrong mail or password. Please try again.';
    if (!user) throw new BadRequestError(errorMessage);

    const token = jwt.sign({ mail }, secretKey, { expiresIn: '24h' });

    const returnedUser = {
        mail: mail,
        token: token,
        role: user.role
    };
    await axios.post('http://localhost:3003/api/session', returnedUser);
    return returnedUser;
};
