import { Injectable, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'src/commons/util/is-empty';
import { UserLogEntity } from 'src/entities/user_log.entity';

import { ApiShareGetResponseDto } from 'src/share/dto/api-share-get-response.dto';
import { UserLogQueryRepository } from 'src/user-log/user-log.query.repository';

@Injectable()
export class ShareService {
  constructor(
    private readonly userLogQueryRepository: UserLogQueryRepository,
  ) {}

  async getShareFortun(uuid: string): Promise<ApiShareGetResponseDto> {
    const userLogWithRelations =
      await this.userLogQueryRepository.findOneWithRelations(uuid);
    if (isEmpty(userLogWithRelations)) {
      throw new NotFoundException('잘못된 uuid 입니다.');
    }

    return this.convertResponseDto(userLogWithRelations);
  }

  private convertResponseDto({
    uuid,
    fortune_date,
    user,
    fortune,
  }: UserLogEntity): ApiShareGetResponseDto {
    return {
      uuid,
      name: user.name,
      birth_date: user.birth_date.toString(),
      fortune_date: fortune_date.toString(),
      action_tip: fortune.action_tip,
      message: fortune.message,
    };
  }
}
