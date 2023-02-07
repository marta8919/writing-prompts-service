import { Module } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.services';
import {PromptsRepository} from './prompts.repository'

@Module({
  controllers: [PromptsController],
  providers: [PromptsService, PromptsRepository]
})
export class PromptsModule {}
