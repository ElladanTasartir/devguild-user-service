import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { GetUserDTO } from './dtos/get-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { FindUsersByIdsDTO } from './dtos/find-users-by-ids.dto';
import { InsertTechnologiesInUserDTO } from './dtos/insert-technologies-in-user.dto';
import { TechnologiesService } from './technologies.service';
import { Technology } from './entities/user-technologies.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly technologiesService: TechnologiesService,
  ) {}

  @Get(':id')
  getUser(@Param(ValidationPipe) { id }: GetUserDTO): Promise<User> {
    return this.userService.getUser(id);
  }

  @Get()
  getUsersById(
    @Query(new ValidationPipe({ transform: true }))
    findUsersByIdsDTO: FindUsersByIdsDTO,
  ): Promise<User[]> {
    return this.userService.getUsersByIds(findUsersByIdsDTO.ids);
  }

  @Post()
  createNewUser(
    @Body(ValidationPipe) createUserDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.createNewUser(createUserDTO);
  }

  @Post(':id/techs')
  insertTechnologiesInUser(
    @Param(ValidationPipe) { id }: GetUserDTO,
    @Body(ValidationPipe)
    insertTechnologiesInUserDTO: InsertTechnologiesInUserDTO,
  ): Promise<Technology[]> {
    return this.technologiesService.insertTechnologiesInUser(
      insertTechnologiesInUserDTO,
      id,
    );
  }
}
