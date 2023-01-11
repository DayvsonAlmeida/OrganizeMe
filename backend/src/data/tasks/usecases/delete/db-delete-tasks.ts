import {
  DeleteTask,
  DeleteTaskInput,
} from "@/domain/usecases/tasks/delete-task";
import { DeleteTasksRepository } from "@/data/tasks/protocols/delete-tasks.repository";

export class DbDeleteTasks implements DeleteTask {
  constructor(private readonly deleteTasksRepository: DeleteTasksRepository) {}

  async remove(task: DeleteTaskInput): Promise<void> {
    await this.deleteTasksRepository.delete(task);
  }
}
