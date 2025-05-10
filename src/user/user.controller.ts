import { Body, Controller, Post } from '@nestjs/common';
import { ApiUserPostRequestBodyDto } from 'src/user/dto/api-user-post-request-body.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: ApiUserPostRequestBodyDto): Promise<boolean> {
    return this.userService.createUser(dto);
  }
}
