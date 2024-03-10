if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { AppModule } from '@/app.module';
import { DOC_FILENAME, DOC_PATH, PORT_DEFAULT } from '@/utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT) || PORT_DEFAULT;
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = parse(
    await readFile(join(__dirname, DOC_PATH, DOC_FILENAME), 'utf8'),
  );

  SwaggerModule.setup('doc', app, swaggerConfig);

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
