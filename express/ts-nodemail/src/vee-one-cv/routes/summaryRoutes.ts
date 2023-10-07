const express = require("express");
const {
  getSummary,
  getTotalYearsOfExperience,
} = require("./../controllers/summaryController");

const summaryRouter = express.Router();

// summaryRouter.route("/").get(getSummary);
summaryRouter.route("/yearsOfExperience").get(getTotalYearsOfExperience);

export default summaryRouter;
