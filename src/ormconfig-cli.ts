import { User } from './modules/user/entities/user.entity';
import { Technology } from './modules/user/entities/user-technologies.entity';
import { ProjectMembers } from './modules/project/entities/project-members.entity';
import { ormConfig } from './ormconfig';

export default {
  ...ormConfig,
  entities: [User, Technology, ProjectMembers],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
