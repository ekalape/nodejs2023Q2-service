import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { LogLevels } from './customLogger/logLevels';
import { CustomLoggerService } from './customLogger/custom-logger.service';


async function bootstrap() {
  let logLvl = process.env.LOG_LVL;


  const app = await NestFactory.create(AppModule, { logger: LogLevels[logLvl] || LogLevels["3"], bufferLogs: true });

  const apiYaml = readFileSync(join(__dirname, '../doc/api.yaml'), 'utf8');
  const apyYamlContent: OpenAPIObject = yaml.load(apiYaml) as OpenAPIObject;
  SwaggerModule.setup('doc', app, apyYamlContent, {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null,
    },
  });


  await app.listen(process.env.PORT || 4000, () =>
    console.log(`App started on port ${process.env.APP_PORT}`),
  );
  const errLogger = new CustomLoggerService("Exceptions")
  process.on('uncaughtException', (err) => {
    // process.stderr.write(`The uncaughtException ${err}`);
    errLogger.error(`The uncaughtException ${err}`)

  });

  process.on('unhandledRejection', (err) => {
    //process.stderr.write(`The unhandledRejection ${err}`);
    errLogger.error(`The uncaughtException ${err}`)
  });



}
bootstrap();
