import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import projectConfig from '../config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(projectConfig.port).then(() => console.log('RGU NLP Processor is up and running'));
}
bootstrap();
