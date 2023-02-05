import { NestFactory } from '@nestjs/core';
import {PromptsModule} from './prompts/prompts.module'
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(PromptsModule);
  // apply pipe to all income requests
  // if no validations rules added to a particular handler the validation pipe won't run on it
  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(3300);
}
bootstrap();
