import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './custom-logger.service';
import { EOL } from 'os';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    private logger = new CustomLoggerService(`HTTP`);
    use(req: Request, res: Response, next: NextFunction) {
        const { method, baseUrl, query, body, protocol, hostname, ip } = req;
        const ctx = req.baseUrl.split("/")[1]

        res.on('finish', async () => {
            const { statusCode } = res;
            this.logger.setContext(`ctx: ${ctx}, status: ${statusCode} <--middleware -->`)
            if (statusCode >= 500) return this.logger.error(`Unexpected server error, status code ${statusCode}`)
            if (statusCode >= 400) {
                await this.logger.error(`Http exception with ${statusCode} status code is thrown`)
                await this.logger.warn(`HTTP request ${method} on ${baseUrl} caused ${HttpStatus[statusCode]} exception`)
            }
            await this.logger.log(
                `HTTP request: ${method} ${baseUrl},query params: ${JSON.stringify(
                    query,
                )}, request body: ${JSON.stringify(
                    body,
                )}, response statusCode: ${statusCode}`,
            );
            await this.logger.debug(`HTTP request: ${method} ${protocol}/${hostname}${baseUrl}, request ip: ${ip} request body: ${JSON.stringify(
                body,
            )}, response status: ${statusCode}`)




        });
        next();
    }
}
