import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ResourceModule } from './resource/resource.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "./configs/typeorm.config";
import { VinModule } from './vin/vin.module';
import {ConfigModule} from "@nestjs/config";
import appConfig from "./configs/app.config";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
          appConfig
      ],
      envFilePath: ['env/.env.production', 'env/.env.development'],
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ResourceModule,
    VinModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}