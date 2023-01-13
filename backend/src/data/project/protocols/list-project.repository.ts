import { Project } from "../../../domain/entities/project";

export interface ListProjectRepository {
  list(): Promise<Project[]>;
}
