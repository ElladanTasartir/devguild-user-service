import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FindUsersByTechnologyParamDTO } from './dtos/find-users-by-techonology.dto';
import { Technology } from './entities/user-technologies.entity';
import { TechnologiesService } from './technologies.service';

@Controller('users/technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  getUsersByTechnology(
    @Param(new ValidationPipe({ transform: true }))
    findUsersByTechnologyParamDTO: FindUsersByTechnologyParamDTO,
  ): Promise<Technology[]> {
    return this.technologiesService.getUsersByTechnology(
      findUsersByTechnologyParamDTO.id,
    );
  }
}
