import mongoose from "mongoose";
import { IInvoice } from "../types/invoice-types";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  serviceType: { type: String, require: true },
  date: { type: Date, required: true },
  usage: { type: String, required: true },
  charge: { type: String, required: true },
  isPaid: { type: Boolean, requred: true, default: false },
  userAccount: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  address: { type: mongoose.Types.ObjectId, required: true, ref: "Address" },
});

const Invoice = mongoose.model<IInvoice>("Invoice", invoiceSchema);

export default Invoice;
