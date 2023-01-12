import { Request, Response } from "express";

import { Controller, Http } from "@/presentation/protocols";

export function expressRouteAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: Http.Request = { body: req.body, params: req.params };

    const { body, statusCode } = await controller.handle(httpRequest);

    if (statusCode !== 200)
      return res.status(statusCode).json({ message: body.message });

    return res.status(statusCode).json(body);
  };
}
