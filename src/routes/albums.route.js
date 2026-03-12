import express from 'express';
import { createEntry, getEntries, getEntryById, updateEntryById, deleteEntryById, getEntriesGenres } from '../controllers/albumController.js';
import { generateToken } from '../config/generateToken.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import requestValidator from '../middlewares/requestValidator.js';
import { createEntrySchema, updateEntrySchema } from '../validators/entrySchemas.js';


const router = express.Router();


router.use(authMiddleware);

router.get('/', getEntries);

router.get('/genres', getEntriesGenres);

router.get('/:id', getEntryById);

router.post('/', requestValidator(createEntrySchema), createEntry);

router.put('/:id', requestValidator(updateEntrySchema), updateEntryById);

router.delete('/:id', deleteEntryById);




















export default router;