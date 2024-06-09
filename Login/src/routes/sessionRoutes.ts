import { Router } from 'express';
import * as sessionController from '../controller/sessionController';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/', validate, sessionController.login);

export default router;
