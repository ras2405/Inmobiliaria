import { Router } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
import { validateParams } from '../middlewares/validateParams';
import { bookingFilterSchema } from '../schemas/bookingFilter';

const router = Router();

router.post('/',validate(bookingSchema), bookingsController.createBooking);
router.get('/',validateParams(bookingFilterSchema), bookingsController.getBookings);

export default router;
