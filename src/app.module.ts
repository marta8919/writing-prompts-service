import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { PromptsEntity } from './prompts/prompts.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite', 
    database: 'db.sqlite', 
    entities: [UserEntity, PromptsEntity], 
    //synchronize: only recomendable in a dev env never on prod
    synchronize: true}), 
  UsersModule, 
  PromptsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
