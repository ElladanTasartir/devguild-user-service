import { Injectable, NotFoundException } from '@nestjs/common';
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
}
