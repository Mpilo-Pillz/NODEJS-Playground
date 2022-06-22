const product = require("../models/product");
exports.postAddProduct = (req, res, next) => {
  product
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};
