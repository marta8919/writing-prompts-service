import { NestFactory } from '@nestjs/core';
import {PromptsModule} from './prompts/prompts.module'
async function bootstrap() {
  const app = await NestFactory.create(PromptsModule);
  await app.listen(3300);
}
bootstrap();
