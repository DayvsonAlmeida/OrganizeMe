import { Project } from "@/domain/entities/project";
import { AddProjectInput } from "@/domain/usecases/project/add-project";
import { DeleteProjectInput } from "@/domain/usecases/project/delete-project";
import { AddProjectRepository } from "@/data/project/protocols/add-project.repository";
import { DeleteProjectRepository } from "@/data/project/protocols/delete-project.repository";
import { FindProjectRepository } from "@/data/project/protocols/find-project.repository";

import { db, ProjectInMemoryDB } from "../db";
import { FindProjectInput } from "@/domain/usecases/project/find-project";

export class ProjectInMemoryRepositoryAdapter
  implements
    AddProjectRepository,
    DeleteProjectRepository,
    FindProjectRepository
{
  async add(project: AddProjectInput): Promise<Project> {
    const inMemoryProject: ProjectInMemoryDB = {
      name: project.name,
      tasks: [],
    };

    db.push(inMemoryProject);
    const id = db.length.toString();

    return {
      id,
      name: project.name,
    };
  }

  async delete(project: DeleteProjectInput): Promise<void> {
    const idx = parseInt(project.id) - 1;
    const hasProject = db[idx];

    if (!hasProject) throw new Error();

    delete db[idx];
  }

  async find(project: FindProjectInput): Promise<Project | null> {
    const idx = parseInt(project.id) - 1;
    const inMemoryProject = db.at(idx);

    if (!inMemoryProject) return null;

    return {
      id: project.id,
      name: inMemoryProject.name,
    };
  }
}
