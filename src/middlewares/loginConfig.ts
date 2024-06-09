import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string;
}

export const secretKey = crypto.randomBytes(64).toString('hex');
console.log("Generated Secret Key:", secretKey);

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    jwt.verify(token, secretKey, (err, decoded: any) => { // SACAR ANY, POR AHORA NO SE PUEDE
        if (err) {
            return res.status(403).send('Forbidden. Invalid token.');
        }
        req.user = decoded.username;
        next();
    });
};

