import EntityNotFoundError from "@/errors/EntityNotFoundError";
import BaseRepository, { Constructor } from "./BaseRepository";
import { Prisma } from "@prisma/client";
import { IProject, IProjectQueryParameters, IProjectQueryResult, IProjectRepository } from "./repository";

type PrismaProject = Prisma.ProjectGetPayload<{}>;

export function AddProjectRepository<TBase extends Constructor<BaseRepository>>(Base: TBase) {
  return class ProjectRepositoryMixin extends Base implements IProjectRepository {
    mapProject(project: PrismaProject): IProject {
      return {
        id: project.id,
        user_id: project.user_id,
        name: project.name,
        description: project.description,
        created_at: project.created_at,
      };
    }

    async listProjects(query: IProjectQueryParameters, userId?: string): Promise<IProjectQueryResult> {
      const where = {
        user_id: userId,
      };
      const [projects, count] = await this.client.$transaction([
        this.client.project.findMany({
          where,
          take: query.limit || this.defaultLimit,
          skip: query.offset || this.defaultOffset,
        }),
        this.client.project.count({ where }),
      ]);

      return {
        projects: projects.map((project) => this.mapProject(project)),
        totalCount: count,
      };
    }

    async getProject(id: string, userId?: string): Promise<IProject> {
      const project = await this.client.project.findUnique({
        where: {
          id,
          user_id: userId,
        },
      });

      if (!project) {
        throw new EntityNotFoundError({
          message: "Project not found",
          statusCode: 404,
          code: "ERR_NOT_FOUND",
        });
      }

      return this.mapProject(project);
    }

    async createProject(payload: any, userId?: string): Promise<IProject> {
      const project = await this.client.project.create({
        data: {
          user_id: userId,
          ...payload,
        },
      });

      return this.mapProject(project);
    }
  };
}
