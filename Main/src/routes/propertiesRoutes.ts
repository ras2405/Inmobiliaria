import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { validate } from '../middlewares/validate';
import { propertySchema } from '../schemas/property';
import { upload } from '../middlewares/uploads';
import { validateImages } from '../middlewares/validateImages';

const router = Router();

router.get('/', propertiesController.getProperties);
router.get('/:id', propertiesController.getProperty);
router.post(
    '/',
    upload.array('pictures'),
    validateImages, validate(propertySchema),
    propertiesController.createProperty
);
router.put('/:id', propertiesController.assignSensor);

export default router;
