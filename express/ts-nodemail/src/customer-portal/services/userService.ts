import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import HttpError from "../models/http-error";
import bcrypt from "bcrypt";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(
      new HttpError("Error retrieving user. Please try again later", 500)
    );
  }

  if (!existingUser) {
    return next(new HttpError("Invalid Credentials", 403));
  }

  let isValidPassword;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError("Error retrieving password. Please try again later", 500)
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid Credentials", 403));
  }

  let token;

  try {
  } catch (error) {}
};