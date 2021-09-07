import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMembers } from './entities/project-members.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectMembers)
    private readonly projectRepository: Repository<ProjectMembers>,
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
}
