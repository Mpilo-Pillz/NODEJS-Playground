import { Router } from "express";
import checkAuth from "../middleware/check-auth";
import { addSubscriptionToUser } from "../controllers/subscription-controller";

const subscriptionRouter = Router();

subscriptionRouter.post("/:userId/subscribe", addSubscriptionToUser);

export default subscriptionRouter;
