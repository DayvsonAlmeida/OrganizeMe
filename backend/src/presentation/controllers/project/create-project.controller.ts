import { Controller, Http } from "@/presentation/protocols";

type CreateProjectInput = {
  name: string;
};

export type Request = Http.Request<CreateProjectInput>;
type Response = Http.Response<any>;

export class CreateProjectController implements Controller<CreateProjectInput> {
  async handle(request: Request): Promise<Response> {
    const { body } = request;

    if (!body || !body.name)
      return {
        statusCode: 400,
        body: {
          message: "Missing params: name",
        },
      };

    return {
      statusCode: 200,
      body: {},
    };
  }
}
