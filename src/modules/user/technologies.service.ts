import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertTechnologiesInUserDTO } from './dtos/insert-technologies-in-user.dto';
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

  insertTechnologiesInUser(
    insertTechnologiesInUserDTO: InsertTechnologiesInUserDTO,
    id: string,
  ) {
    const { technologies } = insertTechnologiesInUserDTO;

    const mapTechnologiesToUser = technologies.map((tech) => ({
      ...tech,
      user_id: id,
    }));

    const techs = this.technologyRepository.create(mapTechnologiesToUser);

    return this.technologyRepository.save(techs);
  }
}
