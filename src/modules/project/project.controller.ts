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
import { InsertCommentDTO } from './dtos/insert-comment.dto';
import { InsertProjectMemberDTO } from './dtos/insert-project-member.dto';
import { ProjectMembers } from './entities/project-members.entity';
import { UserComments } from './entities/user-comments.entity';
import { CommentsWithUsers } from './interfaces/comments-with-users.interface';
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

  @Post(':id/comments')
  insertComment(
    @Param(ValidationPipe)
    getMembersDTO: GetMembersDTO,
    @Body(ValidationPipe)
    insertCommentDTO: InsertCommentDTO,
  ): Promise<UserComments> {
    return this.projectService.insertComment(
      getMembersDTO.id,
      insertCommentDTO,
    );
  }

  @Get(':id/comments')
  getCommentsFromProject(
    @Param(ValidationPipe)
    getMembersDTO: GetMembersDTO,
  ): Promise<CommentsWithUsers[]> {
    return this.projectService.getCommentsFromProject(getMembersDTO.id);
  }
}
