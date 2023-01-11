import { Project } from "../../../domain/entities/project";
import { FindProjectInput } from "../../../domain/usecases/project/find-project";

export interface FindProjectRepository {
  find(project: FindProjectInput): Promise<Project | null>;
}
