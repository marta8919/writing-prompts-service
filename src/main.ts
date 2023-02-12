import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // apply pipe to all income requests
  // if no validations rules added to a particular handler the validation pipe won't run on it
  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(3300);
}
bootstrap();
