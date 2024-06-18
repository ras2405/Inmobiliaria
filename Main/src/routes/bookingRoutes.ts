import { Router } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
import { paySchema } from '../schemas/pay';
import { paymentCallbackSchema } from '../schemas/paymentCallback';
const router = Router();

router.post('/', validate(bookingSchema), bookingsController.createBooking);
router.post('/:id/pay', validate(paySchema), bookingsController.initiatePayment);
router.put(
    '/:id/payment-callback',
    validate(paymentCallbackSchema),
    bookingsController.paymentCallback
);

export default router;
