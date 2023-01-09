export type DeleteTaskInput = {
  id: string;
};

export interface DeleteTask {
  remove(task: DeleteTaskInput): Promise<void>;
}
