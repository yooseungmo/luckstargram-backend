import { Module } from '@nestjs/common';
import { UserLogModule } from 'src/user-log/user-log.module';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

@Module({
  imports: [UserLogModule],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
