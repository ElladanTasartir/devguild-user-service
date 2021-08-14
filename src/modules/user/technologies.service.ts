import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/user-technologies.entity';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async getUsersByTechnology(id: number): Promise<Technology[]> {
    return this.technologyRepository.find({
      where: {
        technology_id: id,
      },
      relations: ['user'],
    });
  }
}
