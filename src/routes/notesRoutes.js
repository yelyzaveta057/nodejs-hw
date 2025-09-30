// src/routes/studentsRoutes.js

import { Router } from 'express';
import { getAllNotes, getNoteById } from '../controllers/notesControllers.js';



const router = Router();

router.get("/notes", getAllNotes);
router.get("/notes/:notetId", getNoteById);

export default router;
