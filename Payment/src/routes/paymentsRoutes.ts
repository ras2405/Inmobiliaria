import { Router } from "express";
import { validate } from "../middlewares/validate";
import { paymentSchema } from "../schemas/payments";
import * as paymentsController from "../controllers/paymentsController";

const router = Router();

router.post('/', validate(paymentSchema), paymentsController.createPayment);
router.post('/refund', validate(paymentSchema), paymentsController.createRefund);


export default router;
