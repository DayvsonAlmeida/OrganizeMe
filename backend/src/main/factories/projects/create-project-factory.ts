import { DbAddProject } from "../../../data/project/usecases/add/db-add-project";
import { CreateProjectController } from "../../../presentation/controllers/project/create/create-project.controller";
import { ProjectInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/project-repository/project-in-memory-repository-adapter";

export function makeCreateProjectController(): CreateProjectController {
  const projectRepository = new ProjectInMemoryRepositoryAdapter();
  const dbAddProject = new DbAddProject(projectRepository);

  return new CreateProjectController(dbAddProject);
}
