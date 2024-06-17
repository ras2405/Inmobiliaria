import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../schemas/login';

const router = Router();

router.post('/', validate(loginSchema), loginController.login);

export default router;
