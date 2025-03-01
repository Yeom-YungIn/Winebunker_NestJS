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
    const { id, password } = authCredentialDto;
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async generateRefreshToken(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { id } = authCredentialDto;
    const refreshToken: string = this.jwtService.sign({ sub: id }, { expiresIn: '7d' });

    await this.userService.updateUserRefreshToken(id, refreshToken);

    return refreshToken;
  }
}
