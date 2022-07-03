/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as compression from 'compression';
import { frontendMiddleware } from './app/frontend.middleware';
import { environment } from './environments/environment';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  let options: any = { logger: environment.log.logLevel };

  const app = await NestFactory.create(AppModule, options);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(compression());
  app.use(frontendMiddleware);
  const port = process.env.PORT || environment.server.port;
  await app.listen(port);
  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
