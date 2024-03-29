import { Request, Response, NextFunction } from "express";
import Invoice from "../models/invoice-model";
import User from "../models/user-model";
import HttpError from "../models/http-error";
import { CheckAuthRequest } from "../types/user-types";
import { validationResult } from "express-validator";
import { requestToPay } from "../services/mobileMoneyService";

export const getInvoiceByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  //  TODO Type correctly
  let userWithInvoices: any;

  try {
    // userWithInvoices = await User.findById(userId).populate("invoices");
    userWithInvoices = await Invoice.find({ userAccount: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching invoices failed, please try again later",
      500
    );
    return next(error);
  }

  //   if (!userWithInvoices || userWithInvoices.invoices.length === 0) {
  //     return next(
  //       new HttpError("Could not find invoices for the provided user id.", 404)
  //     );
  //   }

  res.json({
    invoices: userWithInvoices,
  });
};

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { serviceType, date, usage, charge, userAccount, address } = req.body;

  const invoice = new Invoice({
    serviceType,
    date,
    usage,
    charge,
    userAccount,
    address,
  });

  const createdInvoice = await invoice.save();
  res.status(201).json(createdInvoice);
};

export const updateInvoiceToPaid = async (
  req: CheckAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const { amount, cellphone, invoiceId } = req.body;

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ message: errors });

    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  // const invoiceId = req.params.invoiceId;

  let invoice: any;
  try {
    invoice = await Invoice.findById(invoiceId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not update invoice.",
      500
    );
    return next(error);
  }

  /**
   * TODO fix permissions
   * Read up on new ObjectId and how tocorrectly store
   */

  // if (invoice?.userAccount.toString() !== req?.params?.userId) {
  //   const error = new HttpError(
  //     "You are not allowed to edit this invoice.",
  //     401
  //   );
  //   return next(error);
  // }

  const paymentResponse = await requestToPay(amount, cellphone);

  if (paymentResponse.status === 401) {
    return next(paymentResponse);
  }

  if (invoice && paymentResponse) {
    invoice.isPaid = true;
  }

  try {
    await invoice?.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    message: "successful",
    code: 200,
    invoices: invoice?.toObject({ getters: true }),
  });
};
