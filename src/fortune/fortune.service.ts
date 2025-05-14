import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { isEmpty } from 'src/commons/util/is-empty';
import { generateUUID } from 'src/commons/util/uuid';
import { FortuneEntity } from 'src/entities/fortune.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserLogEntity } from 'src/entities/user_log.entity';
import { ApiFortuneGetRequestQueryDto } from 'src/fortune/dto/api-fortune-get-request-query.dto';
import { ApiFortuneGetResponseDto } from 'src/fortune/dto/api-fortune-get-response.dto';
import { FortuneQueryRepository } from 'src/fortune/fortune.query.repository';
import { getCryptoAlgorithm } from 'src/fortune/helper/crypto-algorithm.helper';
import { UserLogQueryRepository } from 'src/user-log/user-log.query.repository';
import { UserQueryRepository } from 'src/user/user.query.repository';

@Injectable()
export class FortuneService {
  constructor(
    private readonly fortuneQueryRepository: FortuneQueryRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userLogQueryRepository: UserLogQueryRepository,
  ) {}

  async getFortune(dto: ApiFortuneGetRequestQueryDto) {
    const user = await this.findOrCreateUser(dto);
    const idx = getCryptoAlgorithm(dto);

    const fortune = await this.fortuneQueryRepository.findOne(idx);

    const userLog = await this.logUserFortune(dto, user, fortune.uuid);

    return this.toResponseDto(userLog, fortune, dto);
  }

  private async findOrCreateUser(
    dto: ApiFortuneGetRequestQueryDto,
  ): Promise<UserEntity> {
    let user = await this.userQueryRepository.findUser(dto);
    if (isEmpty(user)) {
      user = new UserEntity();
      user.uuid = generateUUID();
      user.name = dto.name;
      user.birth_date = new Date(dto.birth_date);
      await this.userQueryRepository.save(user);
    }
    return user;
  }

  private async logUserFortune(
    dto: ApiFortuneGetRequestQueryDto,
    user: UserEntity,
    fortuneUuid: string,
  ): Promise<UserLogEntity> {
    const userLogEntity = new UserLogEntity();
    userLogEntity.uuid = generateUUID();
    userLogEntity.user_name = user.name;
    userLogEntity.user_uuid = user.uuid;
    userLogEntity.fortune_uuid = fortuneUuid;
    userLogEntity.fortune_date = new Date(dto.fortune_date);
    userLogEntity.short_link = await this.makeShortLike();
    return await this.userLogQueryRepository.save(userLogEntity);
  }

  private toResponseDto(
    { uuid, short_link }: UserLogEntity,
    fortune: FortuneEntity,
    { name, birth_date, fortune_date }: ApiFortuneGetRequestQueryDto,
  ): ApiFortuneGetResponseDto {
    return plainToInstance(
      ApiFortuneGetResponseDto,
      { ...fortune, uuid, name, birth_date, fortune_date, short_link },
      { excludeExtraneousValues: true },
    );
  }

  private async makeShortLike() {
    const { nanoid } = await import('nanoid');
    return nanoid(6);
  }
}
