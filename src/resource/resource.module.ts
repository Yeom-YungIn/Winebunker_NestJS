import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Resource} from "./entity/resource.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([Resource]),
      AuthModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService]
})
export class ResourceModule {}
