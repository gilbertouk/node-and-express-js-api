import { Request, Response } from "express";

export const listTasks = (req: Request, res: Response) => {
  res.status(200).json([]);
};

export const getTask = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ id, name: `Task ${id}` });
};
