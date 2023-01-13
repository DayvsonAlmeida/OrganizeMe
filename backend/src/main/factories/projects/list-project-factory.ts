import { DbListProject } from "../../../data/project/usecases/list/db-list-project";
import { ListProjectsController } from "../../../presentation/controllers/project/list/list-project.controller";
import { ProjectInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/project-repository/project-in-memory-repository-adapter";

export function makeListProjectController(): ListProjectsController {
  const projectRepository = new ProjectInMemoryRepositoryAdapter();
  const dbListProject = new DbListProject(projectRepository);

  return new ListProjectsController(dbListProject);
}
