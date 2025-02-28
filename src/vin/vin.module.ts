import { Module } from '@nestjs/common';
import { VinController } from './vin.controller';
import { VinService } from './vin.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Vin } from "./common/entity/vin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Vin])],
  controllers: [VinController],
  providers: [VinService],
})
export class VinModule {}
