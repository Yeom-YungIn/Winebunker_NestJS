import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as config from 'config';
import * as process from "process";
import * as dotenv from 'dotenv';
const dbConfig = config.get('db');

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}` });
export const typeORMConfig : TypeOrmModuleOptions = {
    type: dbConfig.type,
    host:  process.env.RDS_HOST ,
    port:  Number(process.env.RDS_PORT) ,
    database:  process.env.RDS_DATABASE || dbConfig.database,
    username:  process.env.RDS_USERNAME || dbConfig.username,
    password:  process.env.RDS_PASSWORD || dbConfig.password,
    entities: ["dist/**/*.entity.js"],
    synchronize: process.env.RDS_SYNC || dbConfig.synchronize,
    autoLoadEntities: dbConfig.autoLoadEntities
}