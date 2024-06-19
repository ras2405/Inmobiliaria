import { NextFunction, Router, Response } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
import { validateParams } from '../middlewares/validateParams';
import { bookingFilterSchema } from '../schemas/bookingFilter';
import { authenticateToken, CustomRequest } from '../middlewares/roleAuth';

const router = Router();

const authMiddleware = (role: string) => (req: CustomRequest, res: Response, next: NextFunction) =>
    authenticateToken(req, res, next, role);

router.post('/',
    validate(bookingSchema),
    authMiddleware('Tenant'),
    bookingsController.createBooking
);

router.get('/', validateParams(bookingFilterSchema), bookingsController.getBookings);

export default router;
