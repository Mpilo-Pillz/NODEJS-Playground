const express = require("express");
import {
  createTool,
  getAllTools,
  updateTool,
  getTool,
} from "../controllers/toolsController";

const toolsRouter = express.Router();

toolsRouter.route("/").post(createTool);
toolsRouter.route("/").get(getAllTools);
toolsRouter.route("/:id").get(getTool);
toolsRouter.route("/:id").put(updateTool);

export default toolsRouter;
