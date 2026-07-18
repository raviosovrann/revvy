import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { RequestWithId } from '../middleware/request-id.middleware';

type ExceptionBody = {
  code?: string;
  message?: string | string[];
  fieldErrors?: Array<{ field: string; message: string }>;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const requestId = (request as RequestWithId).id || randomUUID();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_ERROR';
    let message = 'An unexpected error occurred.';
    let fieldErrors: Array<{ field: string; message: string }> = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code =
        status === HttpStatus.BAD_REQUEST ? 'BAD_REQUEST' : `HTTP_${status}`;
      message = exception.message;

      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const body = exceptionResponse as ExceptionBody;
        code = body.code || code;
        message = Array.isArray(body.message)
          ? body.message.join('; ')
          : body.message || message;
        fieldErrors = body.fieldErrors || [];
      }
    }

    response.status(status).json({
      error: { code, message, requestId, fieldErrors },
    });
  }
}
