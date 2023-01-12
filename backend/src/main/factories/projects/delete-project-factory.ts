import { DbDeleteProject } from "../../../data/project/usecases/delete/db-delete-project";
import { DeleteProjectController } from "../../../presentation/controllers/project/delete/delete-project.controller";
import { ProjectInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/project-repository/project-in-memory-repository-adapter";

export function makeDeleteProjectController(): DeleteProjectController {
  const projectRepository = new ProjectInMemoryRepositoryAdapter();
  const dbAddProject = new DbDeleteProject(projectRepository);

  return new DeleteProjectController(dbAddProject);
}
