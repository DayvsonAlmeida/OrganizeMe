import { api } from "../api";
import { ApiTask } from "../dto";
import { Task } from "../../contexts/projects";

type ToggleTaskInput = {
  id: string;
  done: boolean;
};

export async function toggleTask({ done, id }: ToggleTaskInput): Promise<Task> {
  const { data } = await api.patch<ApiTask>(`/api/tasks/${id}`, {
    done,
  });

  return data;
}
