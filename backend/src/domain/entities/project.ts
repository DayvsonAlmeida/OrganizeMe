import { Task } from "./task";

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};
