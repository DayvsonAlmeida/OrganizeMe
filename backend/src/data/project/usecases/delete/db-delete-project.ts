import {
  DeleteProject,
  DeleteProjectInput,
} from "../../../../domain/usecases/project/delete-project";
import { DeleteProjectRepository } from "../../protocols/delete-project.repository";

export class DbDeleteProject implements DeleteProject {
  constructor(
    private readonly deleteProjectRepository: DeleteProjectRepository
  ) {}

  async remove(project: DeleteProjectInput): Promise<void> {
    await this.deleteProjectRepository.delete(project);
  }
}
