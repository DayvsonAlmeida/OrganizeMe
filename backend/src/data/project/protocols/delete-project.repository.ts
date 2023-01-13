import { DeleteProjectInput } from "../../../domain/usecases/project/delete-project";

export interface DeleteProjectRepository {
  delete(project: DeleteProjectInput): Promise<void>;
}
