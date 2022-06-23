require("dotenv").config();
const mysql = require("mysql2");

console.log("env->", process.env);
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: process.env.MY_SQL_DB_PASSWORD,
});

module.exports = pool.promise();
