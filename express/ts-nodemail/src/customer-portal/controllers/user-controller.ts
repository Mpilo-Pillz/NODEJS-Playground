import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";
import { AuthUser, loginService } from "../services/user-service";
import generateToken from "../utils/generate-token";
import HttpError from "../models/http-error";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

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
    return res.status(401).json({ message: "Invalid Credentials", code: 401 });
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
    return res.status(401).json({ message: "Invalid Credentials", code: 401 });
  }

  res.json({
    userId: existingUser.id,
    user: existingUser.email,
    token: generateToken(existingUser.id, email),
    address: existingUser.addresses,
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;
  let existingUser;
  let hashedPassword;
  let token;

  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.status(422).json({ message: errors });

    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser) {
    return res
      .status(422)
      .json({
        message: "User exists already, please login instead",
        code: 422,
      });
  }

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    address: [],
    products: [],
    subscription: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log("Err-->", err);

    return next(new HttpError("Signing up failed, please try again.", 500));
  }

  try {
    token = generateToken(createdUser.id, email);
  } catch (err) {
    console.log(err);

    return next(new HttpError("Signing up failed, please try again.", 500));
  }
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token,
    subscriptions: createdUser.subscriptions,
  });
};
