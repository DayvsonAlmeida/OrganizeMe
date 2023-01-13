import { api } from "../api";
import { ApiTask } from "../dto";

type DeleteTaskInput = {
  id: string;
};

export async function deleteTask({ id }: DeleteTaskInput): Promise<void> {
  await api.delete<ApiTask>(`/api/tasks/${id}`);
}
