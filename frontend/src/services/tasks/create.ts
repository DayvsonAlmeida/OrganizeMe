import { api } from "../api";
import { ApiTask } from "../dto";
import { Task } from "../../contexts/projects";

type CreateTaskInput = {
  name: string;
  responsible: string;
  deadLine: string;
};

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const response = await api.post<ApiTask>(`/api/tasks`, data);

  return response.data;
}
