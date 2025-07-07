import { Request, Response } from "express";
import prisma from "../../../prisma-client";
import EntityNotFoundError from "../../../errors/EntityNotFoundError";

export const listProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany();
  res.status(200).json({ projects });
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    throw new EntityNotFoundError({
      message: "Project not found",
      statusCode: 404,
      code: "ERR_NOT_FOUND",
    });
  }

  res.status(200).json({ project });
};

export const listProjectTasks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await prisma.task.findMany({
    where: { project_id: id },
  });
  res.status(200).json({ tasks });
};
