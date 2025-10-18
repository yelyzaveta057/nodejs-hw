import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username : {
      type: String,
      required: false,
      trim: true,

    },
    password : {
      type: String,
      required: true,

    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


userSchema.pre('save', function(next) {
  if(!this.username){
    this.username = this.email;
  }
  next();
});

userSchema.methods.toJSON = function(){
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
