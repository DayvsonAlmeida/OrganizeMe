import {
  Http,
  Controller,
  ok,
  badRequest,
  serverError,
  MissingParamError,
  DeleteProject,
} from "./delete-project.protocols";

type Response = Http.Response<null>;

export class DeleteProjectController implements Controller<any, null> {
  constructor(private readonly deleteProject: DeleteProject) {}

  async handle(request: Http.Request): Promise<Response> {
    const { params } = request;
    const isMissingField = !params || !params.id;

    if (isMissingField) return badRequest(new MissingParamError("id"));

    try {
      await this.deleteProject.remove({ id: params.id });
      return ok(null);
    } catch {
      return serverError();
    }
  }
}
