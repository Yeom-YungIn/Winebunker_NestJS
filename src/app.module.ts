import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ResourceModule } from './resource/resource.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeORMConfig} from "./configs/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ResourceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
