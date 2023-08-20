import { Router } from "express";
import { check } from "express-validator";

import checkAuth from "../middleware/check-auth";
import {
  createInvoice,
  getInvoiceByUserId,
  updateInvoiceToPaid,
} from "../controllers/invoice-controller";

const invoiceRouter = Router();

invoiceRouter.use(checkAuth);

invoiceRouter.get("/:uid", getInvoiceByUserId);
invoiceRouter.patch("/:uid", updateInvoiceToPaid);
invoiceRouter.post("/create-invoice", [
  check("userAccount").not().isEmpty(),
  check("charge").not().isEmpty(),
  check("usage").not().isEmpty(),
  check("date").not().isEmpty(),
  check("isPaid").not().isEmpty(),
  check("serviceType").not().isEmpty(),
  createInvoice,
]);

export default invoiceRouter;
