import { Router } from 'express';
import * as sessionController from '../controller/sessionController';

const router = Router();

router.post('/', sessionController.login);

export default router;
