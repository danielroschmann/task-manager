import  express from "express";
import { createTaskController, getTasksController, getTaskController, toggleTaskController, removeTaskController, prioritizeTasksController } from "../controllers/task.controller.js";

const router = express.Router();

router.route('/').post(createTaskController).get(getTasksController);
router.route('/prioritizetasks').post(prioritizeTasksController);
router.route('/:id').get(getTaskController).patch(toggleTaskController).delete(removeTaskController);

export default router;