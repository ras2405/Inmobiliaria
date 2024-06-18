import { NextFunction, Router, Response } from 'express';
import * as sessionController from '../controller/sessionController';
import { validate } from '../middlewares/validate';
import { sessionSchema } from '../schema/session';
import { authenticateToken, CustomRequest } from '../../../Main/src/middlewares/loginConfig';

const router = Router();

const authMiddleware = (role: string) => (req: CustomRequest, res: Response, next: NextFunction) =>
    authenticateToken(req, res, next, role);

router.post(
    '/',
    validate(sessionSchema),
    authMiddleware('Admin'),
    sessionController.login);
router.get('/:token', sessionController.getSession);

export default router;
