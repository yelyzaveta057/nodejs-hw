


import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// Отримати список усіх нотатків
export const getAllNotes = async (req, res) => {

  const {page = 1 , perPage = 10, tag, search} = req.query;
  const skip = (page -1) * perPage;

  const notesQuery = Note.find();

  if (search) {
    notesQuery.where({
	  $text: { $search: search }
	});
  }

  if (tag) {
    notesQuery.where("tag").equals(tag);
  };

  const [totalNotes, notes] = await Promise.all ([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);


const totalPages = Math.ceil(totalNotes / perPage);



  res.status(200).json({
  page,
  perPage,
  totalNotes,
  totalPages,
  notes,
}
  );
};

 export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

// Отримати одної нотатки за id
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);


  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};


export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId
  });

  if (!note) {
    next(createHttpError(404, "Note not found"));
    return;
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    {  _id: noteId }, // Шукаємо по id
    req.body,
    { new: true }, // повертаємо оновлений документ
  );

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};
