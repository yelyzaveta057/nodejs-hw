import { Joi, Segments } from 'celebrate';

export const getAllNotesSchema = {
[Segments.BODY]:  Joi.object({
  page: Joi.number().integer().min(1).default(1),
  content: Joi.string().valid('Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',).optional(),
        perPage: Joi.number().integer().min(5).max(20).default(10),
  search: Joi.string().allow("").optional(),

}),
};





