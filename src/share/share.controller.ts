import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ApiShareGetResponseDto } from 'src/share/dto/api-share-get-response.dto';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Get('/uuid')
  @ApiOperation({
    summary: '공유된 운세 조회',
    description: '공유된 운세 조회',
  })
  @ApiParam({
    name: 'uuid',
    type: 'string',
    required: true,
    description: '운세 결과 uuid',
  })
  async getShareFortun(
    @Param('uuid') uuid: string,
  ): Promise<ApiShareGetResponseDto> {
    return this.shareService.getShareFortun(uuid);
  }
}
