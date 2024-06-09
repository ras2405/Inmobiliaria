import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/', validate, loginController.login);

export default router;
