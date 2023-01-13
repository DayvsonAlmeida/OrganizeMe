import { api } from "../api";
import { ApiProject } from "../dto";
import { Project } from "../../contexts/projects";

export async function fetchProjects(): Promise<Project[]> {
  const response = await api.get<ApiProject[]>("/api/projects");
  const projects = response.data.filter((project) => !!project);
  const projectsWithValidTasks = projects.map((project) => ({
    ...project,
    tasks: project.tasks.filter((t) => !!t),
  }));

  return projectsWithValidTasks;
}
