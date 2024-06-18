import { Router } from 'express';
import * as sessionController from '../controller/sessionController';
import { validate } from '../middlewares/validate';
import { sessionSchema } from '../schema/session';

const router = Router();

router.post('/', validate(sessionSchema), sessionController.login);
router.get('/:token', sessionController.getSession);

export default router;
