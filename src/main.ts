import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { LogLevels } from './utils/logLevels';

async function bootstrap() {
  let logLvl = process.env.LOG_LVL;
  if (+logLvl > 2) logLvl = "2"
  if (+logLvl < 0) logLvl = "0"

  const app = await NestFactory.create(AppModule/* , { logger: LogLevels[logLvl] } */);
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
}
bootstrap();
