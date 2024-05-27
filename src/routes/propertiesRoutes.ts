import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { validate } from '../middlewares/validate';
import { propertySchema } from '../schemas/property';

const router = Router();

router.get('/properties', propertiesController.getProperties);
router.get('/properties/:id', propertiesController.getProperty);
router.post('/properties', validate(propertySchema), propertiesController.createProperty);
router.put('/properties/:id', propertiesController.updateProperty);

export default router;
