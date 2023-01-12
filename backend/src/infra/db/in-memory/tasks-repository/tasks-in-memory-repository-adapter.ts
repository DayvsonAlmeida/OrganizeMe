import { Task } from "@/domain/entities/task";
import { AddTaskInput } from "@/domain/usecases/tasks/add-task";
import { AddTasksRepository } from "@/data/tasks/protocols/add-tasks.repository";

import { db, TaskInMemoryDB } from "../db";

export class TasksInMemoryRepositoryAdapter implements AddTasksRepository {
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
}
