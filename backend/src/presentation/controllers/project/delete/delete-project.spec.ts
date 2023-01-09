import { Http, MissingParamError } from "./delete-project.protocols";
import { DeleteProjectController } from "./delete-project.controller";

type SutTypes = {
  sut: DeleteProjectController;
};

const makeSut = (): SutTypes => {
  return {
    sut: new DeleteProjectController(),
  };
};

describe("DeleteProject Controller", () => {
  it("should return 400 if no id is provided", async () => {
    const { sut } = makeSut();
    const httpRequest: Http.Request = { params: {} };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });
});
