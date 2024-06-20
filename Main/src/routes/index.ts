import { Router } from 'express';
import availabilitiesRoutes from './availabilitiesRoutes';
import loginRoutes from './loginRoutes';
import bookingRoutes from './bookingRoutes';
import reportsRoutes from './reportsRoutes'

import propertiesRoutes from './propertiesRoutes';

const router = Router();

router.use('/properties', propertiesRoutes);
router.use('/availabilities', availabilitiesRoutes);
router.use('/login', loginRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reports', reportsRoutes);

export default router;
