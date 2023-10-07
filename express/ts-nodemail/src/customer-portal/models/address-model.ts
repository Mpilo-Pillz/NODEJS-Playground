import mongoose from "mongoose";
import { IAddress } from "../types/address-types";
import { customerPortalConnect } from "../../config/db";

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  streetNumber: { type: String, require: true },
  streetName: { type: String, required: true },
  postalCode: { type: String, required: true },
  region: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const Address = customerPortalConnect.model<IAddress>("Address", addressSchema);
export default Address;
