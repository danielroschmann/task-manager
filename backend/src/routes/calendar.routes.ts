import express  from "express";
import { createCalendarController, getCalendarController } from "../controllers/calendar.controller.js";
import { getEventsFromCalendarController } from "../controllers/event.controller.js";

const router = express.Router();

router.route('/').post(createCalendarController);
router.route('/:id').get(getCalendarController);
router.route('/:id/events').get(getEventsFromCalendarController);
export default router;
