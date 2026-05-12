import  express from "express";
import { createTaskController, getTasksController, getTaskController } from "../controllers/task.controller.js";

const router = express.Router();

router.route('/').post(createTaskController).get(getTasksController).get(getTaskController);

export default router;