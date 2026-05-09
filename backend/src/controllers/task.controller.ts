import { Request, Response } from "express";
import { createTask } from "../services/task.service.js";

export async function createTaskController(req: Request, res: Response) {
    const { title, description } = req.body;
    const task = await createTask(title, description);
    res.status(201).json(task);
}