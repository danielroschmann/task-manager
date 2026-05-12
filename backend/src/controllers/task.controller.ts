import { Request, Response } from "express";
import { createTask, getTasks, getTask, toggleTask, removeTask  } from "../services/task.service.js";
import { prioritizeTasks } from "../services/ai.service.js";

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
    console.log(req.params);
    const task = await getTask(id);
    res.status(200).json(task);
}

export async function toggleTaskController(req: Request, res: Response) {
    const id = Number(req.params.id);
    const task = await toggleTask(id);
    res.status(200).json(task);
}

export async function removeTaskController(req: Request, res: Response) {
    const id = Number(req.params.id);
    const task = await removeTask(id);
    res.status(200).json(task);
}

export async function prioritizeTasksController(req: Request, res: Response) {
    const result = await prioritizeTasks([
        "Finish database assignment",
        "Buy groceries",
        "Study TypeScript",
    ]);
    res.status(200).json(result);
}