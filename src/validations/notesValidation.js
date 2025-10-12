import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import {TAGS} from "../constants/tags.js";


export const getAllNotesSchema = {
[Segments.QUERY]:  Joi.object({
  page: Joi.number().integer().min(1).default(1),
  tag: Joi.string().valid(...TAGS).optional(),
        perPage: Joi.number().integer().min(5).max(20).default(10),
  search: Joi.string().allow("").optional(),

}),
};


export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).trim().required(),
    content: Joi.string().allow('').default(''),
     tag: Joi.string().valid(...TAGS).optional(),
  }),
};


const objectIdValidator = (value, helpers) => {
  const isValidId =  isValidObjectId(value);

  return !isValidId ? helpers.message("Invalid id format") : value;
};

export const noteIdSchema = {
[Segments.PARAMS]: Joi.object({
  noteId: Joi.string(). custom(objectIdValidator).required(),
}),
};


export const updateNoteSchema ={
  [Segments.PARAMS]: Joi.object({
  noteId: Joi.string(). custom(objectIdValidator).required(),
}),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).trim(),
    content: Joi.string().allow('').default(''),
     tag: Joi.string().valid(...TAGS),
  }).min(1),

};









