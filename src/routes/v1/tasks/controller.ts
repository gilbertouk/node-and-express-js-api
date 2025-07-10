import { Request, Response } from "express";
import EntityNotFoundError from "../../../errors/EntityNotFoundError";
import prisma from "../../../prisma-client";
import logger from "../../../logger";

export const listTasks = async (req: Request, res: Response) => {
  logger.debug("Requesting tasks");
  logger
    .child({
      logMetadata: `User ${req.auth?.payload.sub}`,
    })
    .debug("is requesting tasks");
  const tasks = await prisma.task.findMany({
    where: {
      user_id: req.auth?.payload.sub,
    },
  });
  res.status(200).json({ tasks });
};

export const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id, user_id: req.auth?.payload.sub },
  });

  if (!task) {
    throw new EntityNotFoundError({
      message: "Task not found",
      statusCode: 404,
      code: "ERR_NOT_FOUND",
    });
  }

  res.status(200).json({ task });
};
