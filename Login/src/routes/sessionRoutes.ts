import { Router } from 'express';
import * as sessionController from '../controller/sessionController';

const router = Router();

router.post('/saveUserData', sessionController.login);

export default router;
