import { createUser } from "../services/user.service.ts";
import { Request, Response } from "express";

export async function createUserController(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const user = await createUser(firstName, lastName, email, password);
  return res.status(201).json(user); 
}
