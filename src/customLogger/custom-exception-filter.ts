import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomLoggerService } from './custom-logger.service';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: CustomLoggerService,
        private readonly httpAdapterHost: HttpAdapterHost,
    ) { }
    async catch(exception: HttpException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        if (exception instanceof HttpException) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const status = exception.getStatus();
            this.logger.setContext(`status: ${status} <--filter -->`)

            await this.logger.verbose(`status code ${status} - ${exception.name} - ${exception.message}`);
            response.status(status).json({
                statusCode: status,
                message: `${exception.message}`,
            });
        } else {
            const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            const responseBody = {
                statusCode: httpStatus,
                message: 'Something went wrong',
            };
            await this.logger.error(`Uncatched exception ${exception}`);

            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        }
    }
}
