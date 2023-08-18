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
        private logger: CustomLoggerService,
        private httpAdapterHost: HttpAdapterHost,
    ) { }
    async catch(exception: HttpException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        if (exception instanceof HttpException) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const status = exception.getStatus();
            await this.logger.error(`${exception.name} - ${exception.message}`);
            response.status(status).json({
                statusCode: status,
                message: `${exception.name} - ${exception.message}`,
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
