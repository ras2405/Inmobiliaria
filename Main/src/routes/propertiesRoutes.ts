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
import { authMiddleware } from '../middlewares/roleAuth';

const router = Router();

router.get(
    '/',
    validateParams(propertyFilterSchema),
    authMiddleware('Tenant'),
    propertiesController.getProperties
);
router.get('/:id', propertiesController.getProperty);
router.get('/:id/sensors', propertiesController.getSensors);
router.post(
    '/',
    upload.array('pictures'),
    validateImages,
    validate(propertySchema),
    authMiddleware('Owner'),
    propertiesController.createProperty
);
router.post(
    '/:id/pay',
    validate(paySchema),
    authMiddleware('Tenant'),
    propertiesController.initiatePayment
);
router.put(
    '/:id/payment-callback',
    validate(paymentCallbackSchema),
    propertiesController.paymentCallback
);
router.put(
    '/:id',
    validate(propertySensorSchema),
    authMiddleware('Admin'),
    propertiesController.assignSensor
);

export default router;

