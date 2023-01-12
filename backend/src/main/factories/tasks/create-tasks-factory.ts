import { DbAddTasks } from "../../../data/tasks/usecases/add/db-add-tasks";
import { CreateTaskController } from "../../../presentation/controllers/tasks/create/create-task.controller";
import { DeadLineValidator } from "../../../utils/dead-line-validator";
import { TasksInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/tasks-repository/tasks-in-memory-repository-adapter";
import { ProjectInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/project-repository/project-in-memory-repository-adapter";
import { DbFindProject } from "../../../data/project/usecases/find/db-find-project";

export function makeCreateTaskController(): CreateTaskController {
  const deadLineValidator = new DeadLineValidator();

  const projectsRepository = new ProjectInMemoryRepositoryAdapter();
  const dbFindProject = new DbFindProject(projectsRepository);

  const tasksRepository = new TasksInMemoryRepositoryAdapter();
  const dbAddTask = new DbAddTasks(tasksRepository);

  return new CreateTaskController(deadLineValidator, dbFindProject, dbAddTask);
}
