import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLoggerService } from './custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLoggerService(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, query, body, protocol, hostname, ip } = req;
    const ctx = req.baseUrl.split('/')[1] || 'initial';
    this.logger.setContext(`${ctx}`);

    res.on('finish', async () => {
      const { statusCode } = res;
      await this.logger.log(
        `HTTP request: ${method} ${baseUrl}, query params: ${JSON.stringify(
          query,
        )}, request body: ${JSON.stringify(
          body,
        )}, response statusCode: ${statusCode}`,
      );
      await this.logger.debug(
        `HTTP request: ${method} ${protocol}/${hostname}${baseUrl}, request ip: ${ip} request body: ${JSON.stringify(
          body,
        )}, response status: ${statusCode}`,
      );
    });
    next();
  }
}
