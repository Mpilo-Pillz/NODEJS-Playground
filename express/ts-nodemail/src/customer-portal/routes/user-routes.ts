import express, { Router } from "express";
import { login, register } from "../controllers/user-controller";
import { check } from "express-validator";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", [
  check("firstName").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 8 }),
  register,
]);

export default userRouter;
