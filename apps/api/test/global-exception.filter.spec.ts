import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { GlobalExceptionFilter } from '../src/common/filters/global-exception.filter';

describe('GlobalExceptionFilter', () => {
  it('returns the standard envelope and preserves the request ID', () => {
    const status = jest.fn().mockReturnThis();
    const json = jest.fn();
    const host = {
      switchToHttp: () => ({
        getResponse: () => ({ status, json }),
        getRequest: () => ({ id: 'request-123', headers: {} }),
      }),
    } as ArgumentsHost;
    const exception = new BadRequestException({
      code: 'VALIDATION_ERROR',
      message: 'Request validation failed.',
      fieldErrors: [{ field: 'name', message: 'Required' }],
    });

    new GlobalExceptionFilter().catch(exception, host);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed.',
        requestId: 'request-123',
        fieldErrors: [{ field: 'name', message: 'Required' }],
      },
    });
  });
});
