import {
  AddProject,
  badRequest,
  serverError,
  ok,
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
  constructor(private readonly addProject: AddProject) {}

  async handle(request: Request): Promise<Response> {
    const { body } = request;
    const missingField = !body || !body.name;

    if (missingField) return badRequest(new MissingParamError("name"));

    try {
      const project = await this.addProject.add({ name: body.name });

      return ok(project);
    } catch {
      return serverError();
    }
  }
}
