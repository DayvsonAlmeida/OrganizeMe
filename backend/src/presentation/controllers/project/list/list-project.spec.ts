import { ListProject, Project, ServerError } from "./list-project.protocols";
import { ListProjectsController } from "./list-project.controller";

type SutTypes = {
  sut: ListProjectsController;
  listProjectStub: ListProject;
};

describe("ListProjects Controller", () => {
  it("should call ListProject with correct values", async () => {
    const { sut, listProjectStub } = makeSut();
    const listSpy = jest.spyOn(listProjectStub, "list");
    const httpRequest = {};

    await sut.handle(httpRequest);

    expect(listSpy).toBeCalledTimes(1);
    expect(listSpy).toHaveBeenCalledWith();
  });

  it("should return 500 if ListProject throws", async () => {
    const { sut, listProjectStub } = makeSut();
    const httpRequest = {};

    jest.spyOn(listProjectStub, "list").mockImplementationOnce(() => {
      return new Promise((_, reject) => reject(new Error()));
    });

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should return a list of projects", async () => {
    const { sut } = makeSut();
    const httpRequest = {};

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual([
      {
        id: "awesome-id",
        name: "OrganizeMe",
        tasks: [
          {
            id: "awesome-task-id",
            name: "Build MVP",
            responsible: "Dayvson Almeida",
            deadLine: new Date("2023-1-13"),
            done: false,
          },
        ],
      },
    ]);
  });
});

function makeSut(): SutTypes {
  const listProjectStub = makeListProject();
  return {
    listProjectStub,
    sut: new ListProjectsController(listProjectStub),
  };
}

function makeListProject(): ListProject {
  class ListProjecStub implements ListProject {
    readonly projects: Project[] = [];

    constructor() {
      const fakeTask = {
        id: "awesome-task-id",
        name: "Build MVP",
        responsible: "Dayvson Almeida",
        deadLine: new Date("2023-1-13"),
        done: false,
      };
      const fakeProject = {
        id: "awesome-id",
        name: "OrganizeMe",
        tasks: [fakeTask],
      };

      this.projects.push(fakeProject);
    }

    async list(): Promise<Project[]> {
      return this.projects;
    }
  }

  return new ListProjecStub();
}
