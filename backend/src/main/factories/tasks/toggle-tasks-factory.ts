import { DbToggleTasks } from "../../../data/tasks/usecases/toggle/db-toggle-tasks";
import { ToggleTaskController } from "../../../presentation/controllers/tasks/toggle/toggle-task.controller";
import { TasksInMemoryRepositoryAdapter } from "../../../infra/db/in-memory/tasks-repository/tasks-in-memory-repository-adapter";

export function makeToggleTaskController(): ToggleTaskController {
  const tasksRepository = new TasksInMemoryRepositoryAdapter();
  const dbDeleteTasks = new DbToggleTasks(tasksRepository);

  return new ToggleTaskController(dbDeleteTasks);
}
