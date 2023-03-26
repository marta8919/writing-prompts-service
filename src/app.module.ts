import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PromptsModule } from './prompts/prompts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { PromptsEntity } from './prompts/prompts.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [UserEntity, PromptsEntity]
        }
      }
    }),
    // TypeOrmModule.forRoot({
    // type: 'sqlite', 
    // // this decides which data base are we using, we could change to something else on test mode with an env
    // database: 'db.sqlite', 
    // entities: [UserEntity, PromptsEntity], 
    // //synchronize: only recomendable in a dev env never on prod
    // synchronize: true}), 
  UsersModule, 
  PromptsModule
],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_PIPE, 
      useValue: new ValidationPipe({
        whitelist: true,
      }) 
    }
  ],
})
export class AppModule {
  // global scope middleware that will apply to each of our routes
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      cookieSession({
      keys: ['asdf']
    })).forRoutes('*');
  }
}
