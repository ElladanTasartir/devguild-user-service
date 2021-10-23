import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { InsertTechnologiesInUserDTO } from './dtos/insert-technologies-in-user.dto';
import { TechnologyDTO } from './dtos/technology-dto';
import { Technology } from './entities/user-technologies.entity';
import { UserService } from './user.service';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
    private readonly userService: UserService,
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

    await this.userService.getUser(id);

    const userAlreadyHasTechnologies = await this.findUserByTechnologiesIdAndId(
      technologies,
      id,
    );

    const uniqueTechnologies = [
      ...new Set(
        technologies
          .map((tech) => {
            const foundTechnology = userAlreadyHasTechnologies.find(
              (userTech) => tech.technology_id === userTech.technology_id,
            );

            if (!foundTechnology) {
              return tech.technology_id;
            }
          })
          .filter(Boolean),
      ),
    ];

    if (!uniqueTechnologies.length) {
      throw new BadRequestException(
        `User already has technologies "${userAlreadyHasTechnologies
          .map((tech) => tech.technology_id)
          .join(',')}"`,
      );
    }

    const mapTechnologiesToUser = uniqueTechnologies.map((tech) => ({
      technology_id: tech,
      user_id: id,
    }));

    const techs = this.technologyRepository.create(mapTechnologiesToUser);

    return this.technologyRepository.save(techs);
  }
}
