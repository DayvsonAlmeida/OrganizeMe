import { Http } from "../protocols";
import { ServerError } from "../errors";

export const badRequest = (error: Error): Http.Response<Error> => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (error: Error): Http.Response<Error> => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: Error): Http.Response<Error> => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error: Error): Http.Response<Error> => ({
  statusCode: 404,
  body: error,
});

export const serverError = (): Http.Response<ServerError> => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = (data: any): Http.Response<any> => ({
  statusCode: 200,
  body: data,
});

export const created = (): Http.Response => ({
  statusCode: 201,
  body: null,
});
