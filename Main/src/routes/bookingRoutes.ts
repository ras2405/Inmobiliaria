import { Router } from 'express';
import * as bookingsController from '../controllers/bookingController';
import { validate } from '../middlewares/validate';
import { bookingSchema } from '../schemas/booking';
import { paySchema } from '../schemas/pay';
import { paymentCallbackSchema } from '../schemas/paymentCallback';
import { validateParams } from '../middlewares/validateParams';
import { bookingFilterSchema } from '../schemas/bookingFilter';
import { authMiddleware } from '../middlewares/roleAuth';
import { bookingMail } from '../schemas/bookingIdMail';
import { refundSchema } from "../schemas/refundSchema";
import { initiateRefund } from '../services/bookingsService';

const router = Router();
router.post('/',
    validate(bookingSchema),
    authMiddleware('Tenant'),
    bookingsController.createBooking
);
router.post('/:id/pay', validate(paySchema), bookingsController.initiatePayment);
router.put(
    '/:id/payment-callback',
    validate(paymentCallbackSchema),
    bookingsController.paymentCallback
);
router.get('/', validateParams(bookingFilterSchema), authMiddleware('Operator') || authMiddleware("Admin"), bookingsController.getBookings);
router.get('/:id/own/', validate(bookingMail), authMiddleware('Tenant'), bookingsController.getOwnBooking);
router.post('/:id/refund/', validate(refundSchema), authMiddleware('Owner'), bookingsController.initiateRefund);
router.put('/:id/refund-callback/', validate(paymentCallbackSchema), bookingsController.refundCallback);

export default router;
