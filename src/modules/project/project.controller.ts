import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetMembersDTO } from './dtos/get-members.dto';
import { ProjectMembers } from './entities/project-members.entity';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id/members')
  @UseInterceptors(ClassSerializerInterceptor)
  getMembersFromProject(
    @Param(ValidationPipe)
    getMembersDTO: GetMembersDTO,
  ): Promise<ProjectMembers[]> {
    return this.projectService.getMembersFromProject(getMembersDTO.id);
  }
}
