import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { LogLevels } from './customLogger/logLevels';
import { CustomLoggerService } from './customLogger/custom-logger.service';
import { CustomExceptionFilter } from './customLogger/custom-exception-filter';

async function bootstrap() {
  const logLvl = process.env.LOG_LVL;

  const app = await NestFactory.create(AppModule, {
    logger: LogLevels[logLvl] || LogLevels['3'],
    bufferLogs: true,
  });

  const apiYaml = readFileSync(join(__dirname, '../doc/api.yaml'), 'utf8');
  const apyYamlContent: OpenAPIObject = yaml.load(apiYaml) as OpenAPIObject;
  SwaggerModule.setup('doc', app, apyYamlContent, {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null,
    },
  });
  const errLogger = new CustomLoggerService('Errors');
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionFilter(errLogger, httpAdapterHost));

  await app.listen(process.env.PORT || 4000, () =>
    console.log(`App started on port ${process.env.APP_PORT}`),
  );
}
bootstrap();
