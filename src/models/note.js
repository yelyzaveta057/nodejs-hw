import { Schema, model } from 'mongoose';

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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo', // дефолтне значення
    },
  },
  {
    timestamps: true,   // додає createdAt і updatedAt
    versionKey: false,
  }
);

noteSchema.index({ name: "text" });

export const Note = model('Note', noteSchema);
