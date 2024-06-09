import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import { authenticateToken } from '../middlewares/loginConfig';

const router = Router();

router.post('/', authenticateToken, loginController.login);

export default router;
