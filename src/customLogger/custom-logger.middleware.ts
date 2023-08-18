import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new CustomLoggerService(`HTTP`);
    use(req: Request, res: Response, next: NextFunction) {

        const { method, baseUrl, query, body } = req;
        res.on("finish", () => {
            const { statusCode } = res;
            this.logger.log(`HTTP request: ${method} ${baseUrl}, query params: ${JSON.stringify(query)}, request body: ${JSON.stringify(body)}, response statusCode: ${statusCode}`,);
        })

        next();
    }
}