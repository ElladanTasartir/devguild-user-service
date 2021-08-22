import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InsertTechnologiesInUserDTO } from './dtos/insert-technologies-in-user.dto';
import { TechnologyDTO } from './dtos/technology-dto';
import { Technology } from './entities/user-technologies.entity';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  getUsersByTechnology(id: number): Promise<Technology[]> {
    return this.technologyRepository.find({
      where: {
        technology_id: id,
      },
      relations: ['user'],
    });
  }

  private findUserByTechnologiesIdAndId(
    technologies: TechnologyDTO[],
    id: string,
  ): Promise<Technology[]> {
    return this.technologyRepository.find({
      where: {
        technology_id: In(technologies.map((tech) => tech.technology_id)),
        user_id: id,
      },
    });
  }

  async insertTechnologiesInUser(
    insertTechnologiesInUserDTO: InsertTechnologiesInUserDTO,
    id: string,
  ) {
    const { technologies } = insertTechnologiesInUserDTO;

    const userAlreadyHasTechnologies = await this.findUserByTechnologiesIdAndId(
      technologies,
      id,
    );

    if (userAlreadyHasTechnologies.length) {
      throw new BadRequestException(
        `User already has technologies "${userAlreadyHasTechnologies
          .map((tech) => tech.technology_id)
          .join(',')}"`,
      );
    }

    const mapTechnologiesToUser = technologies.map((tech) => ({
      ...tech,
      user_id: id,
    }));

    const techs = this.technologyRepository.create(mapTechnologiesToUser);

    return this.technologyRepository.save(techs);
  }
}
