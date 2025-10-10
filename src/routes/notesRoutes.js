

import { Router } from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {getAllNotesSchema} from "../models/note.js";


const router = Router();

router.get("/notes", celebrate(getAllNotesSchema), getAllNotes);
router.get("/notes/:noteId", getNoteById);
router.post('/notes', createNote);
router.delete("/notes/:noteId", deleteNote);
router.patch('/notes/:noteId', updateNote);

export default router;
