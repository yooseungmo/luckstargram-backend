import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FortuneEntity } from 'src/entities/fortune.entity';
import { FortuneQueryRepository } from 'src/fortune/fortune.query.repository';
import { UserLogModule } from 'src/user-log/user-log.module';
import { UserModule } from 'src/user/user.module';
import { FortuneController } from './fortune.controller';
import { FortuneService } from './fortune.service';

@Module({
  imports: [
    UserLogModule,
    UserModule,
    TypeOrmModule.forFeature([FortuneEntity]),
  ],
  controllers: [FortuneController],
  providers: [FortuneService, FortuneQueryRepository],
})
export class FortuneModule {}
