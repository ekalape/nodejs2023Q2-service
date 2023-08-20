import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { CustomLoggerService } from './customLogger/custom-logger.service';
import { CustomExceptionFilter } from './customLogger/custom-exception-filter';

async function bootstrap() {

  const customLogger = new CustomLoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: customLogger,
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

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionFilter(customLogger, httpAdapterHost));

  await app.listen(process.env.PORT || 4000, () =>
    console.log(`App started on port ${process.env.APP_PORT}`),
  );

}
bootstrap();
