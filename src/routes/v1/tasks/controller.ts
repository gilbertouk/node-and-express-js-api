import { Request, Response } from "express";
import { repository } from "@/data/repositories";
import { getPaginationParameters, parseTaskQueryParameters } from "@/utils";
import { mailer } from "@/services/mailer";
import { CreateTaskUseCase } from "@/use-cases/CreateTaskUseCase";
import { plainToInstance } from "class-transformer";
import { Task } from "@/data/entities/Task";

export const listTasks = async (req: Request, res: Response) => {
  // logger.debug("Requesting tasks");
  // logger
  //   .child({
  //     logMetadata: `User ${req.auth?.payload.sub}`,
  //   })
  //   .debug("is requesting tasks");
  const { page, perPage, limit, offset } = getPaginationParameters(req);
  const queryParameters = parseTaskQueryParameters(req);
  const result = await repository.listTasks({ limit, offset, ...queryParameters }, req.auth?.payload.sub);
  const tasks = result.tasks.map((task) => plainToInstance(Task, task));
  res.status(200).json({
    tasks: tasks.map((task) => task.asDto()),
    page,
    per_page: perPage,
    total_pages: Math.ceil(result.totalCount / perPage),
    total_count: result.totalCount,
  });
};

export const getTask = async (req: Request, res: Response) => {
  const taskData = await repository.getTask(req.params.id, req.auth?.payload.sub);
  const task = plainToInstance(Task, taskData);
  res.status(200).json({ task: task.asDto() });
};

export const createTask = async (req: Request, res: Response) => {
  // const task = await repository.createTask(req.body, req.auth?.payload.sub);
  const createTaskUseCaseInstance = new CreateTaskUseCase(req, mailer);
  const taskData = await createTaskUseCaseInstance.execute();
  const task = plainToInstance(Task, taskData);

  res.status(201).json({ task: task.asDto() });
};

export const updateTask = async (req: Request, res: Response) => {
  const taskData = await repository.updateTask(req.params.id, req.body, req.auth?.payload.sub);
  const task = plainToInstance(Task, taskData);
  res.status(200).json({ task: task.asDto() });
};

export const markTaskAsCompleted = async (req: Request, res: Response) => {
  const taskData = await repository.getTask(req.params.id, req.auth?.payload.sub);
  const task = plainToInstance(Task, taskData);
  task.markAsCompleted();
  await repository.updateTask(req.params.id, task, req.auth?.payload.sub);
  res.status(200).json({ task: task.asDto() });
};
