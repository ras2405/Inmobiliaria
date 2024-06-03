import { Router } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
const router = Router();

router.post('/bookings',validate(bookingSchema), bookingsController.createBooking);

export default router;
