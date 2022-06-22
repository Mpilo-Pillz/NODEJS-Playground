const express = require("express");
const db = require("./util/database");

const app = express();
// db.end(); // shut down db

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
