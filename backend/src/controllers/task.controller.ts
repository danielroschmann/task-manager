import { Request, Response } from "express";
import { createTask, getTasks, getTask, toggleTask, removeTask, getUncompletedTasks, getTaskStats  } from "../services/task.service.js";
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
    const uncompletedTasks = await getUncompletedTasks();

    const taskTitles = uncompletedTasks.map(
        (task) => task.title
        );

    const result = await prioritizeTasks(taskTitles);
    res.status(200).json(result);
}

export async function getTaskStatsController(req: Request, res: Response) {
    const stats = await getTaskStats();
    res.status(200).json(stats);
}
