import { config } from 'dotenv';

const { NODE_ENV } = process.env;

const envFile = `.env.${NODE_ENV}`;
config({ path: envFile });

const REQUIRED_ENV_VARS = [
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USERNAME',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'DEVGUILD_PROJECT_SERVICE_URL',
  'DEVGUILD_TECH_SERVICE_URL',
  'RABBITMQ_HOST',
  'TECHNOLOGIES_PROCESSOR_QUEUE',
];

REQUIRED_ENV_VARS.forEach((envVar) => {
  const val = process.env[envVar];
  if (!val) {
    throw new Error(`Required ENV VAR not set: ${envVar}`);
  }
});

export const projectServiceURL = `http://${process.env.DEVGUILD_PROJECT_SERVICE_URL}`;

export const techServiceURL = `http://${process.env.DEVGUILD_TECH_SERVICE_URL}`;

export const port = Number(process.env.PORT) || 7000;

export const rabbitmq = {
  connectionString: `${process.env.RABBITMQ_HOST}`,
  technologiesProcessorQueue: process.env.TECHNOLOGIES_PROCESSOR_QUEUE,
};

export const postgres = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.SYNC_DB === 'true' || false,
  logging: process.env.ORM_LOG_ENABLED === 'true' || false,
};
