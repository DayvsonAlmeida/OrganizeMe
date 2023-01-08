import {
  badRequest,
  Controller,
  Http,
  MissingParamError,
} from "./create-project.protocols";

type CreateProjectInput = {
  name: string;
};

export type Request = Http.Request<CreateProjectInput>;
type Response = Http.Response<any>;

export class CreateProjectController implements Controller<CreateProjectInput> {
  async handle(request: Request): Promise<Response> {
    const { body } = request;
    const missingField = !body || !body.name;

    if (missingField) return badRequest(new MissingParamError("name"));

    return {
      statusCode: 200,
      body: {},
    };
  }
}
