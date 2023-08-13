import Product from "../models/product-model";
import { Request, Response, NextFunction } from "express";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};
