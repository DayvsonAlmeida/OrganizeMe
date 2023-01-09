import { CreateTaskController } from "./create-task.controller";
import { MissingParamError } from "./create-task.protocols";

type SutTypes = {
  sut: CreateTaskController;
};

const makeSut = (): SutTypes => {
  return {
    sut: new CreateTaskController(),
  };
};

describe("CreateTask Controller", () => {
  it("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should return 400 if no responsible is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "",
        deadLine: "13/01/2023",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("responsible"));
  });

  it("should return 400 if no deadLine is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "",
        projectId: "awesome-id",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("deadLine"));
  });

  it("should return 400 if no projectId is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: "13/01/2023",
        projectId: "",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("projectId"));
  });
});
