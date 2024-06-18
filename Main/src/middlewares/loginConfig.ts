import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user?: string;
}

export const secretKey = "this-is-the-secret-key";

export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction, role: string) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token === undefined || !token) {
        return next(new UnauthorizedError('Access denied. No token provided.'));
    } else {
        try {
            jwt.verify(token, secretKey, async (err, decoded: any) => { // SACAR ANY, POR AHORA NO SE PUEDE
                if (err) {
                    console.log('Token verification error:', err.message);
                    return next(new UnauthorizedError('Invalid token'));
                } else {
                    req.user = decoded?.mail;
                    console.log("Token decoded:", decoded);

                    try {
                        const userRole = await authenticateSession(token, req.user?.toString(), next);
                        if (userRole !== role) {
                            console.log('Role mismatch:', userRole, '!=', role);
                            return next(new UnauthorizedError('Invalid role. You do not have permission to access this resource.'));
                        }
                        next();
                    } catch (sessionError) {
                        return next(new UnauthorizedError('Invalid session token. Please log in again.'));
                    }
                }
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
        console.log("Session data:", session.data);
        return session.data.data.role;
    }
};

