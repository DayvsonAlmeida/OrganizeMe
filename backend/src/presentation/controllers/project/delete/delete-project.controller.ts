import {
  Http,
  Controller,
  ok,
  badRequest,
  MissingParamError,
} from "./delete-project.protocols";

type Response = Http.Response<null>;

export class DeleteProjectController implements Controller<any, null> {
  async handle(request: Http.Request): Promise<Response> {
    const { params } = request;
    const isMissingField = !params || !params.id;

    if (isMissingField) return badRequest(new MissingParamError("id"));

    return ok(null);
  }
}
