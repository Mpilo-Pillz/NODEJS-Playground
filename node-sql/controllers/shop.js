const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.send({ products: rows });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.body.id;
  Product.findById(productId)
    .then(([product]) => res.send({ product: product[0] }))
    .catch((err) => console.log(err));
};
