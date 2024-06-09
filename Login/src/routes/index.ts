import { Router } from 'express';
import sessionRoutes from './sessionRoutes';

const router = Router();

router.use('/saveUserData', sessionRoutes);

export default router;
