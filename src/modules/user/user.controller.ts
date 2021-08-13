import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { GetUserDTO } from './dtos/get-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param(ValidationPipe) { id }: GetUserDTO): Promise<User> {
    return this.userService.getUser(id);
  }
}
