import  express from "express";
import { createTaskController } from "../controllers/task.controller.js";

const router = express.Router();

router.post('/', createTaskController);

export default router;