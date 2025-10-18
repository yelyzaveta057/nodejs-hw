import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
        type: String,
      required: true,

    },
    accessTokenValidUntill: {
       type: Date,
      required: true,

    },
    refreshTokenValidUntill: {
       type: Date,
      required: true,

    },
  },
  {
    timestamps: true,   // додає createdAt і updatedAt
    versionKey: false,
  }
);




export const Session = model('Session', sessionSchema);
