import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import requestValidator from '../middlewares/requestValidator.js';
import { loginSchema, registerSchema } from '../validators/authSchemas.js';

const router = express.Router();

router.post('/register', requestValidator(registerSchema), register);

router.post('/login',requestValidator(loginSchema) , login);

router.post('/logout', logout);


export default router;