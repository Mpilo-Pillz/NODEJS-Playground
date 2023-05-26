import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRouter from "./customer-portal/routes/user-routes";
import addressRouter from "./customer-portal/routes/address-routes";

dotenv.config();

connectDB();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`<div>
    <h1>Server online</h1>
    </div>`);
});

app.post("/", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use("/api/portal/users", userRouter);
app.use("/api/portal/address", addressRouter);

export default app;
