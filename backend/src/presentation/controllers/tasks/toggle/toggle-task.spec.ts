import {
  ToggleTaskController,
  Request,
  ToggleTaskInput as ToggleTaskInputDto,
} from "./toggle-task.controller";
import {
  MissingParamError,
  ServerError,
  Task,
  ToggleTask,
  ToggleTaskInput,
} from "./toggle-task.protocols";

const makeToggleTask = (): ToggleTask => {
  class ToggleTaskStub implements ToggleTask {
    async toggle(task: ToggleTaskInput): Promise<Task> {
      return {
        id: task.id,
        name: "Join to the 104th Training Corps",
        responsible: "Eren",
        deadLine: new Date("2023-1-13"),
        done: task.done,
      };
    }
  }

  return new ToggleTaskStub();
};

type SutTypes = {
  sut: ToggleTaskController;
  toggleTaskStub: ToggleTask;
};

const makeSut = (): SutTypes => {
  const toggleTaskStub = makeToggleTask();
  const sut = new ToggleTaskController(toggleTaskStub);

  return { sut, toggleTaskStub };
};

describe("ToggleTask Controller", () => {
  it("should return 400 if no id is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: {},
      body: {},
    } as Request;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });

  it("should return 400 if done field is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: { id: "awesome-id" },
      body: {} as ToggleTaskInputDto,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("done"));
  });

  it("should call ToggleTask with correct values", async () => {
    const { sut, toggleTaskStub } = makeSut();
    const toggleSpy = jest.spyOn(toggleTaskStub, "toggle");
    const httpRequest: Request = {
      params: { id: "awesome-id" },
      body: { done: true },
    };

    await sut.handle(httpRequest);

    expect(toggleSpy).toBeCalledTimes(1);
    expect(toggleSpy).toHaveBeenCalledWith({ id: "awesome-id", done: true });
  });

  it("should return 500 if ToggleTask throws", async () => {
    const { sut, toggleTaskStub } = makeSut();
    const httpRequest: Request = {
      params: { id: "awesome-id" },
      body: { done: true },
    };

    jest
      .spyOn(toggleTaskStub, "toggle")
      .mockImplementationOnce(
        () => new Promise((_, reject) => reject(new Error()))
      );

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("should return updated task to true", async () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      params: { id: "awesome-id" },
      body: { done: true },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "awesome-id",
      name: "Join to the 104th Training Corps",
      responsible: "Eren",
      deadLine: new Date("2023-1-13"),
      done: true,
    });
  });

  it("should return updated task to false", async () => {
    const { sut } = makeSut();
    const httpRequest: Request = {
      params: { id: "awesome-id" },
      body: { done: false },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "awesome-id",
      name: "Join to the 104th Training Corps",
      responsible: "Eren",
      deadLine: new Date("2023-1-13"),
      done: false,
    });
  });
});
