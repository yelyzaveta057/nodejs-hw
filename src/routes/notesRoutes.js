// src/routes/studentsRoutes.js

import { Router } from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesControllers.js';



const router = Router();

router.get("/notes", getAllNotes);
router.get("/notes/:notetId", getNoteById);
router.post('/notes', createNote);
router.delete("/notes/:noteId", deleteNote);
router.patch('/notes/:notetId', updateNote);

export default router;
