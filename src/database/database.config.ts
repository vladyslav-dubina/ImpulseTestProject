import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenvConfig({ path: '.env' });

export const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: Number(process.env.DATABASE_PORT),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: [`dist/**/entities/*.entity{.ts,.js}`],
  migrations: [`dist/migrations/*{.ts,.js}`],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('DBHandler', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
