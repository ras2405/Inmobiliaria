import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { validate } from '../middlewares/validate';
import { propertySchema } from '../schemas/property';
import { upload } from '../middlewares/uploads';
import { validateImages } from '../middlewares/validateImages';
import { paySchema } from '../schemas/pay';
import { paymentCallbackSchema } from '../schemas/paymentCallback';

const router = Router();

router.get('/', propertiesController.getProperties);
router.get('/:id', propertiesController.getProperty);
router.post(
    '/',
    upload.array('pictures'),
    validateImages,
    validate(propertySchema),
    propertiesController.createProperty
);
router.post('/:id/pay', validate(paySchema), propertiesController.initiatePayment);
router.put(
    '/:id/payment-callback',
    validate(paymentCallbackSchema),
    propertiesController.paymentCallback
);

export default router;

