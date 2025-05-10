import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiFortuneGetRequestQueryDto } from 'src/fortune/dto/api-fortune-get-request-query.dto';
import { ApiFortuneGetResponseDto } from 'src/fortune/dto/api-fortune-get-response.dto';
import { FortuneService } from './fortune.service';

@Controller('fortune')
export class FortuneController {
  constructor(private readonly fortuneService: FortuneService) {}

  @Get()
  @ApiOperation({
    summary: '오늘의 운세 조회',
    description: '오늘의 운세 조회',
  })
  async getFortune(
    @Query() dto: ApiFortuneGetRequestQueryDto,
  ): Promise<ApiFortuneGetResponseDto> {
    return this.fortuneService.getFortune(dto);
  }
}
