import { Injectable } from '@nestjs/common';
import { isNotEmpty } from 'src/commons/util/is-empty';
import { generateUUID } from 'src/commons/util/uuid';
import { UserEntity } from 'src/entities/user.entity';
import { ApiUserPostRequestBodyDto } from 'src/user/dto/api-user-post-request-body.dto';
import { UserQueryRepository } from 'src/user/user.query.repository';

@Injectable()
export class UserService {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async createUser(dto: ApiUserPostRequestBodyDto): Promise<boolean> {
    const existUser = await this.userQueryRepository.findUser(dto);
    if (isNotEmpty(existUser)) return false;

    const userEntity = new UserEntity();
    userEntity.uuid = generateUUID();
    userEntity.name = dto.name;
    userEntity.birth_date = new Date(dto.birth_date);

    await this.userQueryRepository.save(userEntity);

    return true;
  }
}
