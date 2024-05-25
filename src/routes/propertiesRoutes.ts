import { Router } from 'express';
import * as  propertiesController from '../controllers/propertiesController';

const router = Router();

router.get('/properties', propertiesController.getProperties);
router.get('/properties/:id', propertiesController.getProperty);
router.post('/properties', propertiesController.createProperty);
router.put('/properties/:id', propertiesController.updateProperty);

export default router;