import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { FortuneEntity } from 'src/entities/fortune.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserLogEntity } from 'src/entities/user_log.entity';
import { FortuneModule } from 'src/fortune/fortune.module';
import { UserLogModule } from 'src/user-log/user-log.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().valid('mysql').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity, FortuneEntity, UserLogEntity],
        // logging: true,
        // logger: new TypeOrmBlancLogger(),
        synchronize: false,
        charset: 'utf8mb4',
        timezone: 'z',
      }),
    }),
    UserModule,
    FortuneModule,
    UserLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
