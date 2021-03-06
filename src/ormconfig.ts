import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { postgres } from './config';
import { ProjectMembers } from './modules/project/entities/project-members.entity';
import { UserComments } from './modules/project/entities/user-comments.entity';
import { Technology } from './modules/user/entities/user-technologies.entity';
import { User } from './modules/user/entities/user.entity';

const { host, username, password, database, port, logging, synchronize } =
  postgres;

export const ormConfig = {
  type: 'postgres',
  entities: [User, Technology, ProjectMembers, UserComments],
  host,
  port,
  username,
  password,
  database,
  logging,
  synchronize,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
} as TypeOrmModuleOptions;
