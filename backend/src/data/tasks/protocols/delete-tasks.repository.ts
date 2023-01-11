import { DeleteTaskInput } from "../../../domain/usecases/tasks/delete-task";

export interface DeleteTasksRepository {
  delete(project: DeleteTaskInput): Promise<void>;
}
