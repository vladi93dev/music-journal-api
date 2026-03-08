import express from 'express';
import { createEntry } from '../controllers/albumController.js';
import { generateToken } from '../config/generateToken.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.use(authMiddleware);

router.post('/', createEntry);

















export default router;