import { ConnectionOptions } from 'typeorm';
import { config } from './common/config';
import PiletData from './db/entities/piletData.entity';

const pgConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbAuthName,
  password: config.dbAuthPassword,
  database: config.dbName,
  entities: [PiletData],
  synchronize: true
};

export = pgConfig;