import { createCalendar, getCalendar } from "../services/calendar.service.js";
import { Request, Response } from "express";

export async function createCalendarController(req: Request, res: Response) {
  const { name } = req.body;
  const calendar = await createCalendar(name);
  return res.status(201).json(calendar);
}

export async function getCalendarController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const calendar = await getCalendar(id);
  return res.status(200).json(calendar);
}
