import {
  ToggleTaskController,
  Request,
  ToggleTaskInput,
} from "./toggle-task.controller";
import { MissingParamError } from "./toggle-task.protocols";

type SutTypes = {
  sut: ToggleTaskController;
};

const makeSut = (): SutTypes => {
  const sut = new ToggleTaskController();

  return { sut };
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

  it("should return 400 if concluded field is not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      params: { id: "awesome-id" },
      body: {} as ToggleTaskInput,
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("concluded"));
  });
});
