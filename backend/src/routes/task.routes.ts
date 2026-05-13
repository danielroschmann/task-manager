import  express from "express";
import { createTaskController, getTasksController, getTaskController, toggleTaskController, removeTaskController, prioritizeTasksController, getTaskStatsController } from "../controllers/task.controller.js";

const router = express.Router();

router.route('/').post(createTaskController).get(getTasksController);
router.route('/stats').get(getTaskStatsController);
router.route('/prioritizetasks').post(prioritizeTasksController);
router.route('/:id').get(getTaskController).patch(toggleTaskController).delete(removeTaskController);

export default router;