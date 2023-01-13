import { api } from "../api";
import { ApiProject } from "../dto";
import { Project } from "../../contexts/projects";

export async function fetchProjects(): Promise<Project[]> {
  const response = await api.get<ApiProject[]>("/api/projects");

  return response.data.filter((project) => !!project);
}
