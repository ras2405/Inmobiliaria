import { Router } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
import { validateParams } from '../middlewares/validateParams';
import { bookingFilterSchema } from '../schemas/bookingFilter';
import { authMiddleware } from '../middlewares/roleAuth';

const router = Router();

router.post('/',
    validate(bookingSchema),
    authMiddleware('Tenant'),
    bookingsController.createBooking
);

router.get('/', validateParams(bookingFilterSchema), bookingsController.getBookings);

export default router;
