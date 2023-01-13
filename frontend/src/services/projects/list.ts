import { api } from "../api";

type ApiTask = {
  id: string;
  name: string;
  responsible: string;
  deadLine: string;
  done: boolean;
};

type ApiProject = {
  id: string;
  name: string;
  tasks: ApiTask[];
};

export async function fetchProjects() {
  const response = await api.get<ApiProject[]>("/api/projects");

  return response.data.map((project) => ({
    id: project.id,
    name: project.name,
    totalOfTasks: project.tasks.length,
    completed: project.tasks.filter((task) => task.done).length,
  }));
}
