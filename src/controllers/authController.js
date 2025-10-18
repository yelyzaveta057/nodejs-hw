import createHttpError from "http-errors";
import  { User } from "../models/user.js";
import {createSession} from '../services/auth.js';
import bcrypt from 'bcrypt';
import { Session } from "../models/session.js";
import {setSessionCookies} from '../services/auth.js';

export const registerUser = async (req, res) =>{
  const { email, password} = req.body;

  const existingUser = await User.findOne({email});
  if (existingUser){
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);
  setSessionCookies(res,newSession );

  res.status(201).json(newUser);
};


export const loginUser = async (req, res) =>{
  const { email, password} = req.body;

  const user = await User.findOne({email});
  if (!user){
    throw createHttpError(401, 'User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if(!isValidPassword){
    throw createHttpError(401, "Invalid credentials" );

  }
  await Session.deleteOne({userId: user._id});

    const newSession = await createSession(user._id);
    setSessionCookies(res,newSession );


  res.status(200).json(user);
};

export const logoutUser = async (req, res) =>{
  const { sessionId } = req.cookies;

  if (sessionId){
    await Session.deleteOne({_id: sessionId});
  }

res.clearCookie("accessToken");
res.clearCookie("refreshToken");
res.clearCookie("sessionId");

res.status(204).send();
};

export const refreshUserSession = async (req, res) =>{
 const session =  await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,

  });

  if(!session){
    throw createHttpError(401, "Session not found");

  }
  const isRefreshTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if(isRefreshTokenExpired){
    throw createHttpError(401, "Session token expired");

}
await Session.deleteOne({
  _id: req.cookies.sessionId,
  refreshToken: req.cookies.refreshToken,
});

const newSession = await createSession(session.userId);
    setSessionCookies(res,newSession );
    res.status(200).json({
      message: "Session refreshed",
    });
};
