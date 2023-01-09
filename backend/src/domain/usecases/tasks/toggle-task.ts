import { Task } from "../../entities/task";

export type ToggleTaskInput = {
  id: string;
  done: boolean;
};

export interface ToggleTask {
  toggle(task: ToggleTaskInput): Promise<Task>;
}
