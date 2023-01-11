import { Project } from "../../../domain/entities/project";
import { AddProjectInput } from "../../../domain/usecases/project/add-project";

export interface AddProjectRepository {
  add(project: AddProjectInput): Promise<Project>;
}
