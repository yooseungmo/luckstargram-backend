import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiUserPostRequestBodyDto } from 'src/user/dto/api-user-post-request-body.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '사용자 등록',
    description: '사용자 등록',
  })
  async createUser(@Body() dto: ApiUserPostRequestBodyDto): Promise<boolean> {
    return this.userService.createUser(dto);
  }
}
