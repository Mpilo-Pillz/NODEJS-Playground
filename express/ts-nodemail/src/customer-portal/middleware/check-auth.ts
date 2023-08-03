import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../models/http-error";
import { CheckAuthRequest } from "../types/user-types";

dotenv.config();

export default (req: CheckAuthRequest, res: Response, next: NextFunction) => {
  /**
   * Adding the below check for options
   * for certain HTTP Verbs (NOT GET) the browser automatically sends a options request
   * before it sends the actual request
   * */
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const tokenWithoutBearer = req.headers.authorization?.split(" ")[1];

    const token = tokenWithoutBearer;

    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken: string | JwtPayload | any = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    );
    req.userData = { userId: decodedToken.id };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 403);
    return next(error);
  }
};
