export namespace Http {
  export type Request<T = unknown> = {
    body?: T;
    headers?: Record<string, string>;
  };

  export type Response<T = unknown> = {
    statusCode: number;
    body: T;
  };
}
