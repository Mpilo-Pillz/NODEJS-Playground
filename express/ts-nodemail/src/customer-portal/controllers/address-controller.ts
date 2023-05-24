import fs from "fs";

import { Request, Response, NextFunction } from "express";

import mongoose from "mongoose";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import User from "../models/user-model";
import { IAddress } from "../types/address-types";
import Address from "../models/address-model";

export interface CheckAuthRequest extends Request {
  userData?: {
    userId?: string;
  };
}

export const getAddressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressId = req.params.pid;
  let address;
  try {
    address = await Address.findById(addressId);
  } catch (err) {
    console.log(err);

    const error = new HttpError(
      "Something went wrong, could not find a address",
      500
    );
    return next(error);
  }

  if (!address) {
    const error = new HttpError(
      "Could not find a address for the provided id.",
      404
    );
    return next(error);
  }
  /**
   * removing _id and making address an object
   * mongoose adds and id getter to every document which returns the id as a string
   * the getters are lost when we add toObject so setting getters to true retains the getters so they are kept and not lost
   * */

  res.json({ address: address.toObject({ getters: true }) });
};

export const getAddressesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  //  TODO Type correctly
  let userWithAddresses: any;

  try {
    userWithAddresses = await User.findById(userId).populate("addresses");
  } catch (err) {
    const error = new HttpError(
      "Fetching addresses failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithAddresses || userWithAddresses.addresses.length === 0) {
    return next(
      new HttpError("Could not find  addresses for the provided user id.", 404)
    );
  }

  res.json({
    addresses: userWithAddresses.addresses.map((address: any) =>
      address.toObject({ getters: true })
    ),
  });
};

export const createAddress = async (
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
  const { streetNumber, streetName, postalCode, region }: IAddress = req.body;

  const createdAddress = new Address({
    streetNumber,
    streetName,
    postalCode,
    region,
    creator: req?.userData?.userId,
  });

  let user: any;

  try {
    user = await User.findById(req?.userData?.userId);
  } catch (err) {
    const error = new HttpError("Creating address failed", 500);
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
    await createdAddress.save({ session: sess });
    // TODO - fix typing
    user.addresses.push(createdAddress);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);

    const error = new HttpError(
      "Creating address failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ address: createdAddress });
};

export const updateAddress = async (
  req: CheckAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ message: errors });

    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { streetNumber, streetName, postalCode, region }: IAddress = req.body;
  const addressId = req.params.pid;

  let address;
  try {
    address = await Address.findById(addressId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not update address.",
      500
    );
    return next(error);
  }

  /**
   * Add to String cos the crator id comes form monguse as a different type
   */
  if (address?.creator.toString() !== req?.userData?.userId) {
    const error = new HttpError(
      "You are not allowed to edit this address.",
      401
    );
    return next(error);
  }
  if (address) {
    address.streetName = streetName;
    address.streetNumber = streetNumber;
    address.postalCode = postalCode;
    address.region = region;
  }

  try {
    await address?.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update address.",
      500
    );
    return next(error);
  }

  res.status(200).json({ address: address?.toObject({ getters: true }) });
};
