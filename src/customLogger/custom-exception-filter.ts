import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from './custom-logger.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  async catch(exception: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req: Request = host.switchToHttp().getRequest();

    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus();
      this.logger.setContext(`${host.getType()}`);
      if (status >= 500) {
        this.logger.setContext('Server error');
        return this.logger.error(
          `Unexpected server error, status code ${status}`,
        );
      }
      if (status >= 400) {
        this.logger.setContext('Http error');
        await this.logger.error(
          `Http exception with ${status} status code is thrown`,
        );
        await this.logger.warn(
          `HTTP request ${req.method} on ${req.baseUrl} caused ${HttpStatus[status]} exception`,
        );
      }

      await this.logger.verbose(
        `HTTP request ${req.method} on ${req.baseUrl} caused ${exception.name} with  status code ${status} --> ${exception.message}`,
      );
      response.status(status).json({
        statusCode: status,
        message: `${exception.message}`,
      });
    } else {
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.setContext('Server error');
      const responseBody = {
        statusCode: httpStatus,
        message: 'Something went wrong',
      };
      await this.logger.error(`Uncatched exception ${exception}`);

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
