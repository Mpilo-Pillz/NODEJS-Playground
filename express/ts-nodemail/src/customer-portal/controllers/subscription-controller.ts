import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";
import { validationResult } from "express-validator";
import HttpError from "../models/http-error";
import Subscription from "../models/subscriptions-models";
import mongoose from "mongoose";
import Invoice from "../models/invoice-model";

export interface CheckAuthRequest extends Request {
  userData?: {
    userId?: string;
  };
}

// export const addSubscriptionToUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.params.userId;
//     const { startDate, monthlyFee, address, cellphone, plan, description } =
//       req.body;

//     console.log("req.params", userId);

//     if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({ message: "Invalid userId" });
//     }
//     const user: any = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.subscriptions.push({
//       startDate,
//       monthlyFee: parseInt(monthlyFee),
//         address: {},
//       cellphone,
//       plan,
//       description,
//     });
//     console.log(":subs pushed");

//     user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     console.log("err", error);

//     res.status(500).json({ message: "Error subscribing user" });
//   }
// };

export const addSubscriptionToUser = async (
  req: CheckAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ message: errors });

    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { startDate, monthlyFee, address, cellphone, plan, description } =
    req.body;

  const subscription = new Subscription({
    startDate,
    monthlyFee,
    address,
    cellphone,
    plan,
    description,
    creator: req?.params?.userId,
  });

  let user: any;

  try {
    user = await User.findById(req?.params?.userId);
  } catch (err) {
    const error = new HttpError("Creating subscription failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await subscription.save({ session: sess });
    // TODO - fix typing
    await user.subscriptions.push(subscription);
    await user.save({ session: sess });

    const invoice = new Invoice({
      serviceType: plan,
      date: startDate,
      usage: "unlimited",
      charge: monthlyFee,
      userAccount: req?.params?.userId,
      address,
    });

    await invoice.save();
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);

    const error = new HttpError(
      "Creating subscription failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ message: "Success" });
};
