import { Router } from 'express';
import * as  propertyController from '../controllers/propertyController';

const router = Router();

router.get('/properties', propertyController.getProperties);
router.get('/properties/:id', propertyController.getProperty);
router.post('/properties', propertyController.createProperty);
router.put('/properties/:id', propertyController.updateProperty);

export default router;