import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { validate } from '../middlewares/validate';
import { propertySchema } from '../schemas/property';

const router = Router();

router.get('/', propertiesController.getProperties);
router.get('/:id', propertiesController.getProperty);
router.post('', validate(propertySchema), propertiesController.createProperty);
router.put('/:id', propertiesController.updateProperty);

export default router;
