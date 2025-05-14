import { Injectable, NotFoundException } from '@nestjs/common';
import { isEmpty } from 'src/commons/util/is-empty';
import { UserLogQueryRepository } from 'src/user-log/user-log.query.repository';

@Injectable()
export class UserLogService {
  constructor(
    private readonly userLogQueryRepository: UserLogQueryRepository,
  ) {}

  async findUuidByShortLink(code: string): Promise<string | null> {
    const uuid: string | null =
      await this.userLogQueryRepository.findUuidByShortLink(code);
    if (isEmpty(uuid)) throw new NotFoundException('Invalid short link');

    return uuid;
  }
}
