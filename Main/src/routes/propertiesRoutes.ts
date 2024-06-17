import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { validate } from '../middlewares/validate';
import { propertySchema } from '../schemas/property';
import { upload } from '../middlewares/uploads';
import { validateImages } from '../middlewares/validateImages';
import { paySchema } from '../schemas/pay';
import { paymentCallbackSchema } from '../schemas/paymentCallback';
import { propertySensorSchema } from '../schemas/propertySensor';
import { propertyFilterSchema } from '../schemas/propertyFilter';
import { validateParams } from '../middlewares/validateParams';

const router = Router();

router.get('/', validateParams(propertyFilterSchema), propertiesController.getProperties);
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
router.put('/:id', validate(propertySensorSchema), propertiesController.assignSensor);

export default router;

