import { Task } from "@/domain/entities/task";
import { AddTaskInput } from "@/domain/usecases/tasks/add-task";
import { AddTasksRepository } from "@/data/tasks/protocols/add-tasks.repository";
import { DeleteTasksRepository } from "@/data/tasks/protocols/delete-tasks.repository";

import { db, TaskInMemoryDB } from "../db";
import { DeleteTaskInput } from "@/domain/usecases/tasks/delete-task";

export class TasksInMemoryRepositoryAdapter
  implements AddTasksRepository, DeleteTasksRepository
{
  async add({
    deadLine,
    name,
    projectId,
    responsible,
  }: AddTaskInput): Promise<Task> {
    const projectIdx = parseInt(projectId) - 1;
    const project = db.at(projectIdx);

    if (!project) throw new Error();

    const taskIdx = `${projectId}-${project.tasks.length}`;

    const inMemoryTask: TaskInMemoryDB = {
      id: taskIdx,
      name,
      deadLine,
      responsible,
      done: false,
    };

    project.tasks.push(inMemoryTask);

    return {
      id: taskIdx,
      name,
      deadLine,
      responsible,
      done: false,
    };
  }

  async delete(task: DeleteTaskInput): Promise<void> {
    const [projectId, taskId] = task.id.split("-").map((id) => parseInt(id));
    const project = db.at(projectId - 1);

    delete project?.tasks[taskId];
  }
}
