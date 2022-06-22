const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.send({ products: rows });
    })
    .catch((err) => console.log(err));
};
