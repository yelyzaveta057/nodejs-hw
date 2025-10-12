import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo', // дефолтне значення
    },
  },
  {
    timestamps: true,   // додає createdAt і updatedAt
    versionKey: false,
  }
);

noteSchema.index({ title: "text", content: "text" });

export const Note = model('Note', noteSchema);
