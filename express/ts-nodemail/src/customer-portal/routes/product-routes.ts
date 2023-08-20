import { Router } from "express";
import checkAuth from "../middleware/check-auth";
import { getProducts, createProduct } from "../controllers/product-controller";

const productRouter = Router();

productRouter
  .get("/get-products", getProducts)
  .post("/create-product", createProduct);

export default productRouter;
