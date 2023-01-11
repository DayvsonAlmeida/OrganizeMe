import { Project } from "../../../domain/entities/project";
import { DeleteProjectInput } from "../../../domain/usecases/project/delete-project";

export interface DeleteProjectRepository {
  delete(project: DeleteProjectInput): Promise<void>;
}
