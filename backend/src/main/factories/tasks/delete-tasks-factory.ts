import { DbDeleteTasks } from "../../../data/tasks/usecases/delete/db-delete-tasks";
import { DeleteTaskController } from "../../../presentation/controllers/tasks/delete/delete-task.controller";
import { TasksInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/tasks-repository/tasks-in-memory-repository-adapter";

export function makeDeleteTaskController(): DeleteTaskController {
  const tasksRepository = new TasksInMemoryRepositoryAdapter();
  const dbDeleteTasks = new DbDeleteTasks(tasksRepository);

  return new DeleteTaskController(dbDeleteTasks);
}
