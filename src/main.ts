import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfiguration } from './modules/config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('amarilo');
  await app.listen(EnvConfiguration().port);
}
bootstrap();
