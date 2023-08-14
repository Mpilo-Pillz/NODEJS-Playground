import mongoose from "mongoose";

export interface IInvoice {
  serviceType: string;
  date: Date;
  usage: string;
  charge: string;
  userAccount: mongoose.Types.ObjectId;
}
