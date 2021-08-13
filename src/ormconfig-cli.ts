import { User } from './modules/user/entities/user.entity';
import { Technology } from './modules/user/entities/user-technologies.entity';
import { ormConfig } from './ormconfig';

export default {
  ...ormConfig,
  entities: [User, Technology],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
