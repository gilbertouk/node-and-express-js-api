import express, { Router } from "express";
import { listProjects, getProject, listProjectTasks, createProject } from "./controller";
import authenticateUser from "@/middleware/authenticate-user";
import validateRequest from "@/middleware/validate-request";
import { createProjectSchema } from "@/data/request-schemas";

const projects: Router = express.Router();

projects.use(authenticateUser);
projects.get("/", listProjects);
projects.get("/:id", getProject);
projects.get("/:id/tasks", listProjectTasks);
projects.post("/", validateRequest(createProjectSchema), createProject);

export default projects;
