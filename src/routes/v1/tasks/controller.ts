import { Request, Response } from "express";
import EntityNotFoundError from "../../../errors/EntityNotFoundError";

export const listTasks = async (req: Request, res: Response) => {
  throw new EntityNotFoundError({
    message: "Entity not found",
    statusCode: 404,
    code: "ERR_NOT_FOUND",
  });
  // res.status(200).json([]);
};

export const getTask = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({ id, name: `Task ${id}` });
};
