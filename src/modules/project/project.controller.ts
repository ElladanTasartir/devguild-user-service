import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetMembersDTO } from './dtos/get-members.dto';
import { InsertProjectMemberDTO } from './dtos/insert-project-member.dto';
import { ProjectMembers } from './entities/project-members.entity';
import { ProjectService } from './project.service';

@Controller('projects')
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id/members')
  getMembersFromProject(
    @Param(ValidationPipe)
    getMembersDTO: GetMembersDTO,
  ): Promise<ProjectMembers[]> {
    return this.projectService.getMembersFromProject(getMembersDTO.id);
  }

  @Post(':id/members')
  insertProjectMember(
    @Param(ValidationPipe)
    getMembersDTO: GetMembersDTO,
    @Body(ValidationPipe) insertProjectMemberDTO: InsertProjectMemberDTO,
  ): Promise<void> {
    return this.projectService.insertProjectMember(
      getMembersDTO.id,
      insertProjectMemberDTO.user_id,
    );
  }
}
