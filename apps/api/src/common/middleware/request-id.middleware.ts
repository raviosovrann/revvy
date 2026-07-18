import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';

const REQUEST_ID_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/;

export type RequestWithId = Request & { id: string };

export function requestIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const incoming = request.header('x-request-id');
  const requestId =
    incoming && REQUEST_ID_PATTERN.test(incoming) ? incoming : randomUUID();

  (request as RequestWithId).id = requestId;
  response.setHeader('x-request-id', requestId);
  next();
}
