import { Module } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptsEntity } from './prompts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromptsEntity])],
  controllers: [PromptsController],
  providers: [PromptsService]
})
export class PromptsModule {}
