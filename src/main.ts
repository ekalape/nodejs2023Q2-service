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
    bufferLogs: false,
    autoFlushLogs: false,
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
  app.useGlobalFilters(
    new CustomExceptionFilter(customLogger, httpAdapterHost),
  );

  process.on('unhandledException', async (err) => {
    if (err) {
      customLogger.setContext('Server error');
      await customLogger.error('Something unexpected happened...');
      process.stdout.write(
        'Something unexpected happened (Unhandled Exception)',
      );
    }
  });
  process.on('uncatchedException', async (err) => {
    if (err) {
      customLogger.setContext('Server error');
      await customLogger.error('Something unexpected happened...');
      process.stdout.write(
        'Something unexpected happened (Uncatched Exception)',
      );
    }
  });

  await app.listen(process.env.PORT || 4000, () =>
    console.log(`App started on port ${process.env.APP_PORT}`),
  );
}
bootstrap();
