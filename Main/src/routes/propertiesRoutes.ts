import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { validate } from '../middlewares/validate';
import { propertySchema } from '../schemas/property';
import { upload } from '../middlewares/uploads';
import { validateImages } from '../middlewares/validateImages';
import { paySchema } from '../schemas/pay';

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
router.post('/:id/payment-callback', propertiesController.paymentCallback);

export default router;

