import express  from "express";
import { createCalendarController, getCalendarController, getAllCalendarsController, getMainCalendarController, setMainCalendarController } from "../controllers/calendar.controller.js";
import { getEventsFromCalendarController, createEventController } from "../controllers/event.controller.js";

const router = express.Router();

router.route('/').get(getAllCalendarsController).post(createCalendarController);
router.route('/main').get(getMainCalendarController);
router.route('/:id').get(getCalendarController);
router.route('/:id/main').patch(setMainCalendarController);
router.route('/:id/events').get(getEventsFromCalendarController).post(createEventController);
export default router;
