import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ApiUserPostRequestBodyDto } from 'src/user/dto/api-user-post-request-body.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueryRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findUser(dto: ApiUserPostRequestBodyDto): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { name: dto.name, birth_date: new Date(dto.birth_date) },
    });
  }

  async save(userEntity: UserEntity) {
    return this.repository.save(userEntity);
  }

  async findOne(uuid: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: { uuid },
    });
  }
}
