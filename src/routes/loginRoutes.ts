import { Router } from 'express';
import * as loginController from '../controllers/loginController';

const router = Router();

// si se agregan permisos:
// const { requiredScopes } = require('express-oauth2-jwt-bearer');
// const checkScopes = requiredScopes('read:messages');

router.get('/login', jwtCheck, loginController.login);
