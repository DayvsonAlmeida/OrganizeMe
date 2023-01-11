import { Task } from "@/domain/entities/task";
import { AddTask, AddTaskInput } from "@/domain/usecases/tasks/add-task";
import { AddTasksRepository } from "@/data/tasks/protocols/add-tasks.repository";

export class DbAddTasks implements AddTask {
  constructor(private readonly addTasksRepository: AddTasksRepository) {}

  async add(task: AddTaskInput): Promise<Task> {
    return await this.addTasksRepository.add(task);
  }
}
