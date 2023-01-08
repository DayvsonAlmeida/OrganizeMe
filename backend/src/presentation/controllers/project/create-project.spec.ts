import { MissingParamError } from "./create-project.protocols";
import { CreateProjectController, Request } from "./create-project.controller";

type SutTypes = {
  sut: CreateProjectController;
};

const makeSut = (): SutTypes => ({
  sut: new CreateProjectController(),
});

describe("CreateProject Controller", () => {
  it("should return 400 if no body is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = { body: {} } as Request;

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should return 400 if no name is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = { body: { name: "" } };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });
});
