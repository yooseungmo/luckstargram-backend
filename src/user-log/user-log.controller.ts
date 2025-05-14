import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserLogService } from './user-log.service';

@Controller('short')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get(':code')
  @ApiOperation({
    summary: '숏링크 리다이렉트',
    description: '숏링크 리다이렉트',
  })
  async getUuidToShortLink(@Param('code') code: string) {
    const uuid = await this.userLogService.getUuidToShortLink(code);
    return { uuid };
  }
}
