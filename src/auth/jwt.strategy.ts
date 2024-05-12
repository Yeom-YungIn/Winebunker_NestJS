import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {Repository} from "typeorm";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.getOrThrow('auth.secret', {infer: true}),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const {userName} = payload
        const user: User = await this.userRepository.findOneBy({userName})
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}