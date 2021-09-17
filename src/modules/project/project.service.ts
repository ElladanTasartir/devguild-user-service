import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { InsertCommentDTO } from './dtos/insert-comment.dto';
import { ProjectMembers } from './entities/project-members.entity';
import { UsersComments } from './entities/users-comments.entity';
import { CommentsWithUsers } from './interfaces/comments-with-users.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectMembers)
    private readonly projectRepository: Repository<ProjectMembers>,
    @InjectRepository(UsersComments)
    private readonly commentsRepository: Repository<UsersComments>,
    private readonly userService: UserService,
  ) {}

  async getMembersFromProject(id: string): Promise<ProjectMembers[]> {
    const project = await this.projectRepository.find({
      where: {
        project_id: id,
      },
      relations: ['user'],
    });

    if (!project) {
      throw new NotFoundException(`Project wit ID "${id}" not found`);
    }

    return project;
  }

  async insertProjectMember(id: string, user_id: string): Promise<void> {
    const userFoundInProject = await this.projectRepository.findOne({
      where: {
        project_id: id,
        user_id,
      },
    });

    if (userFoundInProject) {
      throw new BadRequestException(
        `User "${user_id}" is already in project "${id}"`,
      );
    }

    const projectMember = await this.projectRepository.create({
      project_id: id,
      user_id,
    });

    await this.projectRepository.save(projectMember);
  }

  insertComment(
    id: string,
    insertCommentDTO: InsertCommentDTO,
  ): Promise<UsersComments> {
    const { comment, user_id } = insertCommentDTO;

    const createdComment = this.commentsRepository.create({
      comment,
      user_id,
      project_id: id,
    });

    return this.commentsRepository.save(createdComment);
  }

  async getCommentsFromProject(id: string): Promise<CommentsWithUsers[]> {
    const commentsFromProject = await this.commentsRepository.find({
      project_id: id,
    });

    const usersIds = [
      ...new Set(commentsFromProject.map((comment) => comment.user_id)),
    ];

    const users = await this.userService.getUsersByIds(usersIds);

    return this.mapUsersToComments(commentsFromProject, users);
  }

  mapUsersToComments(
    comments: UsersComments[],
    users: User[],
  ): CommentsWithUsers[] {
    return comments.map((comment) => {
      const userWhoCommented = users.find(
        (user) => user.id === comment.user_id,
      );

      if (!userWhoCommented) {
        return;
      }

      delete comment.user_id;

      return {
        ...comment,
        user_comment: {
          username: userWhoCommented.username,
          avatar_url: userWhoCommented.avatar_url,
        },
      };
    });
  }
}
