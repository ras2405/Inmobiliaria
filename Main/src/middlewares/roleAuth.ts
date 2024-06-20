import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../exceptions/UnauthorizedError';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user?: string;
}

export const secretKey = "this-is-the-secret-key";

export const authMiddleware = (role: string) => (req: CustomRequest, res: Response, next: NextFunction) =>
    authenticateToken(req, res, next, role);

interface DecodedToken {
    mail: string;
}

export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction, role: string) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === undefined || !token) {
        return next(new UnauthorizedError('Access denied. No token provided.'));
    } else {
        try {
            const decoded = await new Promise<DecodedToken>((resolve, reject) => {
                jwt.verify(token, secretKey, async (err, decoded) => {
                    if (err) {
                        return next(new UnauthorizedError('Invalid token'));
                    } else {
                        if (typeof decoded === 'object' && 'mail' in decoded) {
                            req.user = decoded?.mail;
                            console.log('Decoded token:', decoded);
                            try {
                                const userRole = await authenticateSession(token, req.user?.toString(), next);
                                if (userRole !== role) {
                                    return next(new UnauthorizedError('Invalid role. You do not have permission to access this resource.'));
                                }
                                next();
                            } catch (sessionError) {
                                return next(new UnauthorizedError('Invalid session token. Please log in again.'));
                            }
                        } else {
                            return next(new UnauthorizedError('Invalid token'));
                        }
                    }
                });
            });
        } catch (error) {
            return next(error);
        }
    }
};

export const authenticateSession = async (auth: string | undefined, mail: string | undefined, next: NextFunction) => {
    const session = await axios.get(`http://localhost:3003/api/session/${auth}`);
    if (session.data.data.mail as string != mail) {
        return next(new UnauthorizedError('Invalid session token. Please log in again.'));
    } else {
        return session.data.data.role;
    }
};

