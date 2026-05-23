import { Request, Response } from "express";
import { createEvent, getEvent, getEventsFromCalendar  } from "../services/event.service.js";

export async function createEventController(req: Request, res: Response) {
  const { title, description, startDate, endDate, calenderId } = req.body;
  const event = await createEvent(title, description, startDate, endDate, calenderId);
  return res.status(201).json(event);
}

export async function getEventController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const event = await getEvent(id);
  return res.status(200).json(event);
}

export async function getEventsFromCalendarController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const events = await getEventsFromCalendar(id);
  return res.status(200).json(events);
}
