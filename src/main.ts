if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.PORT) || 4000;
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = parse(
    await readFile(join(__dirname, '../doc/api.yaml'), 'utf8'),
  );

  SwaggerModule.setup('docs', app, swaggerConfig);

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
