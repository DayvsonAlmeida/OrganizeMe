import { createContext } from "react";

export type Task = {
  id: string;
  name: string;
  responsible: string;
  deadLine: string;
  done: boolean;
};

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export type AddTaskInput = {
  name: string;
  deadLine: string;
  responsible: string;
  projectId: string;
};

export type ToggleTaskInput = {
  id: string;
  done: boolean;
};

export interface ProjectsContextProps {
  projects: Project[];
  addProject: (name: string) => Promise<Project>;
  removeProject: (id: string) => Promise<void>;
  addTask: (data: AddTaskInput) => Promise<Task>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (data: ToggleTaskInput) => Promise<Task>;
}

export const ProjectsContext = createContext<ProjectsContextProps>({
  projects: [],
  addProject(name) {
    throw new Error("Not implemented method!");
  },
  removeProject(id) {
    throw new Error("Not implemented method!");
  },
  addTask(data) {
    throw new Error("Not implemented method!");
  },
  removeTask(id) {
    throw new Error("Not implemented method!");
  },
  toggleTask(data) {
    throw new Error("Not implemented method!");
  },
});
