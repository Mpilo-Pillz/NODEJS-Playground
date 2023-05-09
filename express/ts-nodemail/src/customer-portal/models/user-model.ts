import mongoose from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
