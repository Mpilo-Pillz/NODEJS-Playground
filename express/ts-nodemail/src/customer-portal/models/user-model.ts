import mongoose from "mongoose";
import { IAddress } from "../types/address-types";
import Subscription from "./subscriptions-models";
import { customerPortalConnect } from "../../config/db";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  products: any[];
  addresses: IAddress[];
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    subscriptions: [{ type: mongoose.Types.ObjectId, ref: "Subscription" }],
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    addresses: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
    invoices: [{ type: mongoose.Types.ObjectId, ref: "Invoice" }],
  },
  { timestamps: true }
);

const User = customerPortalConnect.model("User", userSchema);

export default User;
