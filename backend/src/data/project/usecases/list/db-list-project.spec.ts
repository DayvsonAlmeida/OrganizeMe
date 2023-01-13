import { Project } from "@/domain/entities/project";
import { ListProjectRepository } from "../../protocols/list-project.repository";
import { DbListProject } from "./db-list-project";

describe("DbFindProject Usecase", () => {
  it("should call ListProjectRepository with correct values", async () => {
    const { sut, listProjectRepositoryStub } = makeSut();
    const listSpy = jest.spyOn(listProjectRepositoryStub, "list");

    await sut.list();

    expect(listSpy).toHaveBeenCalledWith();
    expect(listSpy).toHaveBeenCalledTimes(1);
  });

  it("should throws if ListProjectRepository throws", async () => {
    const { sut, listProjectRepositoryStub } = makeSut();

    jest
      .spyOn(listProjectRepositoryStub, "list")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const promise = sut.list();

    await expect(promise).rejects.toThrow();
  });

  it("should return a list of projects on success", async () => {
    const { sut } = makeSut();

    const projects = await sut.list();

    expect(projects).toHaveLength(1);
    expect(projects).toEqual([
      {
        id: "awesome-id",
        name: "OrganizeMe",
        tasks: [],
      },
    ]);
  });
});

type SutTypes = {
  sut: DbListProject;
  listProjectRepositoryStub: ListProjectRepository;
};

function makeSut(): SutTypes {
  const listProjectRepositoryStub = makeListProjectRepository();
  const sut = new DbListProject(listProjectRepositoryStub);

  return {
    sut,
    listProjectRepositoryStub,
  };
}

function makeListProjectRepository(): ListProjectRepository {
  class ListProjectRepositoryStub implements ListProjectRepository {
    async list(): Promise<Project[]> {
      return [
        {
          id: "awesome-id",
          name: "OrganizeMe",
          tasks: [],
        },
      ];
    }
  }

  return new ListProjectRepositoryStub();
}
