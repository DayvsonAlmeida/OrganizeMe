import { Task } from "@/domain/entities/task";
import {
  ToggleTask,
  ToggleTaskInput,
} from "@/domain/usecases/tasks/toggle-task";
import { ToggleTasksRepository } from "@/data/tasks/protocols/toggle-tasks.repository";

export class DbToggleTasks implements ToggleTask {
  constructor(private readonly toogleTasksRepository: ToggleTasksRepository) {}

  async toggle(task: ToggleTaskInput): Promise<Task> {
    return await this.toogleTasksRepository.toggle(task);
  }
}
