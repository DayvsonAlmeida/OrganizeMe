import { api } from "../api";

type DeleteProjectInput = {
  id: string;
};

export async function deleteProject(data: DeleteProjectInput): Promise<void> {
  await api.delete<void>(`/api/projects/${data.id}`);
}
