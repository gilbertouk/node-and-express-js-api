import { Request, Response } from "express";
import prisma from "@/prisma-client";
import EntityNotFoundError from "@/errors/EntityNotFoundError";

export const listProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      user_id: req.auth?.payload.sub,
    },
  });
  res.status(200).json({ projects });
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.project.findUnique({
    where: { id, user_id: req.auth?.payload.sub },
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
    where: { project_id: id, user_id: req.auth?.payload.sub },
  });
  res.status(200).json({ tasks });
};

export const createProject = async (req: Request, res: Response) => {
  const project = await prisma.project.create({
    data: {
      user_id: req.auth?.payload.sub as string,
      ...req.body,
    },
  });

  res.status(201).json({ project });
};
