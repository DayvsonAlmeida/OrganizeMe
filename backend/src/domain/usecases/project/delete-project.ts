export type DeleteProjectInput = {
  id: string;
};

export interface DeleteProject {
  remove(project: DeleteProjectInput): Promise<void>;
}
