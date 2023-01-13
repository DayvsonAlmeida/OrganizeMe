import { Project } from "@/domain/entities/project";
import { ListProject } from "@/domain/usecases/project/list-project";
import { ListProjectRepository } from "../../protocols/list-project.repository";

export class DbListProject implements ListProject {
  constructor(private readonly listProjectRepository: ListProjectRepository) {}

  async list(): Promise<Project[]> {
    return await this.listProjectRepository.list();
  }
}
