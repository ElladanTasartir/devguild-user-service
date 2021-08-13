import { User } from './modules/user/entities/user.entity';
import { ormConfig } from './ormconfig';

export default {
  ...ormConfig,
  entities: [User],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
