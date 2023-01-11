import { Project } from "@/domain/entities/project";
import { FindProjectInput } from "@/domain/usecases/project/find-project";
import { FindProjectRepository } from "../../protocols/find-project.repository";
import { DbFindProject } from "./db-find-project";

type SutTypes = {
  sut: DbFindProject;
  findProjectRepositoryStub: FindProjectRepository;
};

const makeFindProjectRepository = (): FindProjectRepository => {
  class FindProjectRepositoryStub implements FindProjectRepository {
    find(project: FindProjectInput): Promise<Project | null> {
      const fakeProject = { id: project.id, name: "My Project" };

      return new Promise((resolve) => resolve(fakeProject));
    }
  }

  return new FindProjectRepositoryStub();
};

const makeSut = (): SutTypes => {
  const findProjectRepositoryStub = makeFindProjectRepository();
  const sut = new DbFindProject(findProjectRepositoryStub);

  return {
    sut,
    findProjectRepositoryStub,
  };
};

describe("DbFindProject Usecase", () => {
  it("should call FindProjectRepository with correct values", async () => {
    const { sut, findProjectRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findProjectRepositoryStub, "find");
    const projectData = { id: "awesome-id" };

    await sut.find(projectData);

    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith({ id: "awesome-id" });
  });

  it("should throws if FindProjectRepository throws", async () => {
    const { sut, findProjectRepositoryStub } = makeSut();
    const projectData = { id: "awesome-id" };
    jest
      .spyOn(findProjectRepositoryStub, "find")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.find(projectData);

    await expect(promise).rejects.toThrow();
  });

  it("should return null if there is no project with provided id", async () => {
    const { sut, findProjectRepositoryStub } = makeSut();
    const projectData = { id: "awesome-id" };

    jest
      .spyOn(findProjectRepositoryStub, "find")
      .mockImplementationOnce(() => new Promise((resolve) => resolve(null)));

    const project = await sut.find(projectData);

    expect(project).toBeNull();
  });

  it("should return a project on success", async () => {
    const { sut } = makeSut();
    const projectData = { id: "awesome-id" };

    const project = await sut.find(projectData);

    expect(project).toEqual({
      id: "awesome-id",
      name: "My Project",
    });
  });
});
