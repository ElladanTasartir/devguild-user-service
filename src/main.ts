import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './config';
import { port } from './config';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    logger.verbose(`Application running on port ${port}`);
  });
}
bootstrap();
