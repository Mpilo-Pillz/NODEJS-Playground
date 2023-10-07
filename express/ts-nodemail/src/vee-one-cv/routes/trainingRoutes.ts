const express = require("express");
const {
  createUdemyCourse,
  getAllTrainings,
} = require("../controllers/trainingController");

const trainingRouter = express.Router();

trainingRouter.route("/").post(createUdemyCourse);
trainingRouter.route("/").get(getAllTrainings);

export default trainingRouter;
