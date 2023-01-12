import { DeleteTaskInput } from "../../../domain/usecases/tasks/delete-task";

export interface DeleteTasksRepository {
  delete(task: DeleteTaskInput): Promise<void>;
}
