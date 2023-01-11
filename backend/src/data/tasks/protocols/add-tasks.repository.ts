import { Task } from "../../../domain/entities/task";
import { AddTaskInput } from "../../../domain/usecases/tasks/add-task";

export interface AddTasksRepository {
  add(task: AddTaskInput): Promise<Task>;
}
