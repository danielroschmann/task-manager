import { Request, Response } from "express";
import { createTask, getTasks, getTask } from "../services/task.service.js";

export async function createTaskController(req: Request, res: Response) {
    const { title, description } = req.body;
    const task = await createTask(title, description);
    res.status(201).json(task);
}

export async function getTasksController(req: Request, res: Response) {
    const tasks = await getTasks();
    res.status(200).json(tasks);
}

export async function getTaskController(req: Request, res: Response) {
    const id = Number(req.params.id);
    const task = await getTask(id);
    res.status(200).json(task);
}