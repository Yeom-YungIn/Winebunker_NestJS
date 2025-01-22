import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import * as config from 'config';
import {PassportModule} from "@nestjs/passport";
import { AuthController } from "./service/auth.controller";
import { AuthService } from "./service/auth.service";
import { User } from "../user/common/entity/user.entity";
import { JwtStrategy } from "./common/strategy/jwt.strategy";
const jwtConfig = config.get('jwt');
@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret: jwtConfig.secretKey,
        signOptions: {
          expiresIn: jwtConfig.expiresIn,
        }
      }),
      PassportModule.register({
        defaultStrategy: 'jwt',
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
