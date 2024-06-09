import { Router } from 'express';
import * as loginController from '../controllers/loginController';

const router = Router();

console.log('loginRoutes');
router.post('/', loginController.login);

export default router;
