import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bycrpt from 'bcryptjs'
import {JwtService} from "@nestjs/jwt";
import { User } from "../common/entity/user.entity";
import { AuthCredentialDto } from "../common/dto/auth-credential.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,

    ) {
    }


    async generateAccessToken(authCredentialDto: AuthCredentialDto): Promise<Object> {
        const {userName, password} = authCredentialDto;
        const user = await this.userRepository.findOneBy({userName});
        const compare = await bycrpt.compare(password, user.password);
        if (user && compare) {
            const payload = { userName }
            const accessToken = this.jwtService.sign(payload);
            return {'result': 'Login Success', accessToken};
        }else {
            throw new UnauthorizedException();
        }
    }

    generateRefreshToken(authCredentialDto: AuthCredentialDto): string {
        const {userName} = authCredentialDto;
        return this.jwtService.sign({ sub: userName }, { expiresIn: '3h' });
    }
}
