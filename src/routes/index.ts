import { Router } from 'express';
import availabilitiesRoutes from './availabilitiesRoutes';
import propertiesRoutes from './propertiesRoutes';

const router = Router();

router.use('/properties', propertiesRoutes);
router.use('/availabilities', availabilitiesRoutes);

export default router;
