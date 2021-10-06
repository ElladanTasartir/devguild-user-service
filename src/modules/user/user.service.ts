import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FetchTechService } from '../fetch/fetch-tech.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UsersTechnologies } from './interfaces/technology.interface';
import { UserWithTechnologies } from './interfaces/users-with-technologies.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('TECHNOLOGIES_PROCESSOR')
    private readonly technologProcessorClient: ClientProxy,
    private readonly fetchTechService: FetchTechService,
  ) {}

  async getUser(
    id: string,
    relations = true,
  ): Promise<User | UserWithTechnologies> {
    const relationOptions = relations
      ? {
          relations: ['technologies'],
        }
      : {};

    const user = await this.userRepository.findOne(id, relationOptions);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    if (user.technologies?.length) {
      const technologies = await this.fetchTechService.findTechnologiesbyIds(
        user.technologies.map((tech) => tech.technology_id),
      );

      return this.mapTechnologiesToSingleUser(technologies, user);
    }

    return user;
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    return this.userRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  getUserByGithubId(github_id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        github_id,
      },
    });
  }

  async processUser(id: string): Promise<void> {
    const user = await this.getUser(id, false);

    this.technologProcessorClient.emit('process-user', user);
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.getUser(id, false);

    for (const key in updateUserDTO) {
      user[key] = updateUserDTO[key];
    }

    return this.userRepository.save(user);
  }

  async createNewUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { github_id, email } = createUserDTO;

    const userAlreadyExists = await this.userRepository.findOne({
      where: {
        email,
        github_id,
      },
    });

    if (userAlreadyExists) {
      throw new BadRequestException(`User already registered`);
    }

    const newUser = this.userRepository.create(createUserDTO);

    await this.userRepository.save(newUser);

    this.technologProcessorClient.emit('process-technologies', {
      id: newUser.id,
      github_id,
    });

    return newUser;
  }

  mapTechnologiesToSingleUser(
    technologies: UsersTechnologies[],
    user: User,
  ): UserWithTechnologies {
    const userWithTechnologies = user.technologies.map((tech) =>
      technologies.find((technology) => technology.id === tech.technology_id),
    );

    delete user.technologies;

    return {
      ...user,
      users_technologies: userWithTechnologies,
    };
  }

  mapTechnologiesToUsers(
    technologies: UsersTechnologies[],
    users: User[],
  ): UserWithTechnologies[] {
    return users.map((user) => {
      const userWithTechnologies = user.technologies.map((tech) =>
        technologies.find((technology) => technology.id === tech.technology_id),
      );

      delete user.technologies;

      return {
        ...user,
        users_technologies: userWithTechnologies,
      };
    });
  }
}
