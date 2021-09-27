import { User } from '../entities/user.entity';
import { UsersTechnologies } from './technology.interface';

export interface UserWithTechnologies extends User {
  users_technologies: UsersTechnologies[];
}
