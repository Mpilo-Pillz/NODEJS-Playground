import mongoose from "mongoose";
import { cvConnect } from "../../config/db";

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  proficiency: { type: Number, required: true },
  toolType: {
    type: String,
    uppercase: true,
    enum: ["LANGUAGE", "FRONTEND", "BACKEND", "TEST"],
  },
});

const Tool = cvConnect.model("Tool", toolSchema);
export default Tool;
