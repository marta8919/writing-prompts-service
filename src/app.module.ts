import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({type: 'sqlite', database: 'db.sqlite', entities: [], synchronize: true}), UsersModule, PromptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
