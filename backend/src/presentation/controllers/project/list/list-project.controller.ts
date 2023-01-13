import {
  serverError,
  ok,
  Controller,
  Http,
  Project,
  ListProject,
} from "./list-project.protocols";

type Response = Http.Response<Project[]>;

export class ListProjectsController implements Controller {
  constructor(private readonly listProjects: ListProject) {}

  async handle(request: Http.Request): Promise<Response> {
    try {
      const projectList = await this.listProjects.list();

      return ok(projectList);
    } catch {
      return serverError();
    }
  }
}
