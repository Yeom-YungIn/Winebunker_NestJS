import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from '../common/dto/request/auth-credential.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { name, password } = authCredentialDto;
    const user = await this.userService.findUserById(name);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async generateRefreshToken(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { name } = authCredentialDto;
    const refreshToken: string = this.jwtService.sign({ sub: name }, { expiresIn: '7d' });

    await this.userService.updateUserRefreshToken(name, refreshToken);

    return refreshToken;
  }
}
