import {Body, Controller, Post,  Res, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialDto} from "./dto/auth-credential.dto";
import {User} from "./entity/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<User> {
        console.log(authCredentialDto);
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/login')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async logIn(@Body() authCredentialDto:AuthCredentialDto, @Res() res) {
        const accessToken = await this.authService.generateAccessToken(authCredentialDto);
        const refreshToken = this.authService.generateRefreshToken(authCredentialDto);

        res.cookie('refreshToken', refreshToken, {httpOnly: true})

        res.send(accessToken);
    }
}
