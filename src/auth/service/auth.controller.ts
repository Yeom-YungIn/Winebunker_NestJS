import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from '../common/dto/request/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async logIn(@Res() res, @Body() authCredentialDto: AuthCredentialDto) {
    const accessToken = await this.authService.generateAccessToken(authCredentialDto);
    const refreshToken = this.authService.generateRefreshToken(authCredentialDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json(accessToken);
  }
}
