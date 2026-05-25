import { createCalendar, getCalendar, getAllCalendars, getMainCalendar, setMainCalendar } from "../services/calendar.service.js";
import { Request, Response } from "express";

export async function createCalendarController(req: Request, res: Response) {
  const { name, isMain } = req.body;
  const calendar = await createCalendar(name, isMain);
  return res.status(201).json(calendar);
}

export async function getCalendarController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const calendar = await getCalendar(id);
  return res.status(200).json(calendar);
}

export async function getAllCalendarsController(req: Request, res: Response) {
  const calendars = await getAllCalendars();
  return res.status(200).json(calendars);
}

export async function getMainCalendarController(req: Request, res: Response) {
  const calendar = await getMainCalendar();
  return res.status(200).json(calendar);
}

export async function setMainCalendarController(req: Request, res: Response) {
  const id = Number(req.params.id);
  const calendar = await setMainCalendar(id);
  return res.status(200).json(calendar);
}
