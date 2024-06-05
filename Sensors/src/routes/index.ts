import { Router } from 'express';
import sensorsRoutes from './sensorsRoutes';

const router = Router();
router.use('/sensors', sensorsRoutes);

export default router;
