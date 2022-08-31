import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL ?? "");
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Failed to Connect to DB`);
    process.exit(1);
  }
};

export default connectDB;
