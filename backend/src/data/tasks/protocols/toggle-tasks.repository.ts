import { Task } from "../../../domain/entities/task";
import { ToggleTaskInput } from "../../../domain/usecases/tasks/toggle-task";

export interface ToggleTasksRepository {
  toggle(project: ToggleTaskInput): Promise<Task>;
}
