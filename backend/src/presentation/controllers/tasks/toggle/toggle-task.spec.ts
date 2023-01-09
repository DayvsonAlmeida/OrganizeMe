import {
  ToggleTaskController,
  Request,
  ToggleTaskInput as ToggleTaskInputDto,
} from "./toggle-task.controller";
import {
  MissingParamError,
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
});
