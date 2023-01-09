import { Task } from "../../entities/task";

export type AddTaskInput = {
  name: string;
  responsible: string;
  deadLine: Date;
  projectId: string;
};

export interface AddTask {
  add(task: AddTaskInput): Promise<Task>;
}
