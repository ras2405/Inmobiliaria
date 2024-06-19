import { Router } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
import { paySchema } from '../schemas/pay';
import { paymentCallbackSchema } from '../schemas/paymentCallback';
import { validateParams } from '../middlewares/validateParams';
import { bookingFilterSchema } from '../schemas/bookingFilter';
import { bookingMail } from '../schemas/bookingIdMail';

const router = Router();

router.post('/', validate(bookingSchema), bookingsController.createBooking);
router.post('/:id/pay', validate(paySchema), bookingsController.initiatePayment);
router.put(
    '/:id/payment-callback',
    validate(paymentCallbackSchema),
    bookingsController.paymentCallback
);
router.post('/', validate(bookingSchema), bookingsController.createBooking);
router.get('/', validateParams(bookingFilterSchema), bookingsController.getBookings);
router.get('/:id/own/',validate(bookingMail), bookingsController.getOwnBooking);

export default router;
