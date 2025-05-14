import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { UserLogService } from './user-log.service';

@Controller()
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Get(':code')
  @Redirect()
  @ApiOperation({
    summary: '숏링크 리다이렉트',
    description: '숏링크 리다이렉트',
  })
  async redirectByShort(
    @Param('code') code: string,
    @Res() res: ExpressResponse,
  ) {
    const uuid = await this.userLogService.findUuidByShortLink(code);
    return { url: `/share/${uuid}`, statusCode: 302 };
  }
}
