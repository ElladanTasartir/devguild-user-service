import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { postgres } from './config';

const { host, username, password, database, port, logging, synchronize } =
  postgres;

export const ormConfig = {
  type: 'postgres',
  autoLoadEntities: true,
  host,
  port,
  username,
  password,
  database,
  logging,
  synchronize,
} as TypeOrmModuleOptions;
