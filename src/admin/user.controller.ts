import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CredentialsDto } from './utils/interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('createuser')
  async createUser(@Body() signUpCredentialsDto: CredentialsDto) {
    return this.userService.createUser(
      signUpCredentialsDto.email,
      signUpCredentialsDto.password,
    );
  }
}
