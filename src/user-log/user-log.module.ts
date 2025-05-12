import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FortuneEntity } from 'src/entities/fortune.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserLogEntity } from 'src/entities/user_log.entity';
import { UserLogQueryRepository } from 'src/user-log/user-log.query.repository';
import { UserLogController } from './user-log.controller';
import { UserLogService } from './user-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogEntity, UserEntity, FortuneEntity]),
  ],
  controllers: [UserLogController],
  providers: [UserLogService, UserLogQueryRepository],
  exports: [UserLogQueryRepository],
})
export class UserLogModule {}
