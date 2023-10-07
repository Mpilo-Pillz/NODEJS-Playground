import mongoose from "mongoose";

export const customerPortalConnect = mongoose.createConnection();
export const cvConnect = mongoose.createConnection();

export const connectDB = async () => {
  try {
    await customerPortalConnect.openUri(process.env.DATABASE_URL ?? "");
    await cvConnect.openUri(process.env.CV_DATABASE_URL ?? "");
    console.log(`MongoDB Connected: ${customerPortalConnect.readyState}`);
    console.log(`MongoDB Connected: ${cvConnect.readyState}`);
  } catch (err) {
    console.error(`Failed to Connect to DB: ${err}`);
    process.exit(1);
  }
};

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const customerPortalConnect = await mongoose.createConnection(
//       process.env.DATABASE_URL ?? ""
//     );
//     const cvConnect = await mongoose.createConnection(
//       process.env.CV_DATABASE_URL ?? ""
//     );
//     console.log(`MongoDB Connected: ${customerPortalConnect.readyState}`);
//     console.log(`MongoDB Connected: ${cvConnect.readyState}`);

//     return { customerPortalConnect, cvConnect }; // return the connections
//   } catch (err) {
//     console.error(`Failed to Connect to DB: ${err}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const customerPortalConnect = await mongoose.connect(
//       process.env.DATABASE_URL ?? ""
//     );
//     const cvConnect = await mongoose.connect(process.env.CV_DATABASE_URL ?? "");

//     console.log(`MongoDB Connected: ${customerPortalConnect.connection.readyState}`);
//     console.log(`MongoDB Connected: ${cvConnect.connection.readyState}`);

//     return {cvConnect, customerPortalConnect}
//   } catch (err) {
//     console.error(`Failed to Connect to DB: ${err}`);
//     process.exit(1);
//   }
// };

// export default connectDB;
