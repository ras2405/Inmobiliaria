import { Router } from 'express';
import availabilitiesRoutes from './availabilitiesRoutes';
import loginRoutes from './loginRoutes';
import propertiesRoutes from './propertiesRoutes';

const router = Router();

router.use('/properties', propertiesRoutes);
router.use('/availabilities', availabilitiesRoutes);
router.use('/login', loginRoutes);

export default router;
