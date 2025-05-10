import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogEntity } from 'src/entities/user_log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserLogQueryRepository {
  constructor(
    @InjectRepository(UserLogEntity)
    private repository: Repository<UserLogEntity>,
  ) {}

  async save(userLogEntity: UserLogEntity) {
    return this.repository.save(userLogEntity);
  }
}
