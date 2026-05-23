import express from "express";
import { createEventController, getEventController } from "../controllers/event.controller.js";

const router = express.Router();

router.route('/').post(createEventController);
router.route('/:id').get(getEventController);
export default router;
