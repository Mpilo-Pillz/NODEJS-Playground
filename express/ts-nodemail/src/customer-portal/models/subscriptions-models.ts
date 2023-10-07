import mongoose from "mongoose";
import { ISubscription } from "../types/subscription-types";
import { customerPortalConnect } from "../../config/db";

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  plan: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  monthlyFee: { type: Number, required: true },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  cellphone: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Subscription = customerPortalConnect.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
export default Subscription;
