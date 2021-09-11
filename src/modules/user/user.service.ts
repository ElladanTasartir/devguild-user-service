import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['technologies'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
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

  async createNewUser(createUserDTO: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findOne({
      where: {
        email: createUserDTO.email,
        github_id: createUserDTO.github_id,
      },
    });

    if (userAlreadyExists) {
      throw new BadRequestException(`User already registered`);
    }

    const newUser = this.userRepository.create(createUserDTO);

    return this.userRepository.save(newUser);
  }
}
