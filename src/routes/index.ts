import { Router } from 'express';
import availabilitiesRoutes from './availabilitiesRoutes';
import bookingRoutes from './bookingRoutes';
import propertiesRoutes from './propertiesRoutes';

const router = Router();

router.use('/properties', propertiesRoutes);
router.use('/availabilities', availabilitiesRoutes);
router.use('/bookings', bookingRoutes);

export default router;
