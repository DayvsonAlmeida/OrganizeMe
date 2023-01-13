import { api } from "../api";
import { Project } from "../../contexts/projects";
import { ApiProject } from "../dto";

type CreateProjectInput = {
  name: string;
};

export async function createProject(
  data: CreateProjectInput
): Promise<Project> {
  const { data: result } = await api.post<ApiProject>("/api/projects", data);

  return {
    id: result.id,
    name: result.name,
    tasks: result.tasks,
  };
}
