import { Router } from "express";
import { check } from "express-validator";
import {
  createAddress,
  getAddressesByUserId,
} from "../controllers/address-controller";
import checkAuth from "../middleware/check-auth";

const addressRouter = Router();

addressRouter.use(checkAuth);

addressRouter.get("/get-addresses", getAddressesByUserId);
addressRouter.post("/create-address", [
  check("streetNumber").not().isEmpty(),
  check("streetName").not().isEmpty(),
  check("postalCode").not().isEmpty(),
  check("region").not().isEmpty(),
  createAddress,
]);

export default addressRouter;
