import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../user/common/dto/request/create-user.dto';
import { User } from '../../user/common/entity/user.entity';
import { LoginDto } from './dto/request/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user: User = await this.userService.findUserByName(name);

    if (!user) {
      throw new UnauthorizedException('Invalid name or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid name or password');
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateAccessToken(user.id);

    await this.userService.updateUserRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    await this.signUpByName(createUserDto);
  }

  async signUpByName(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;

    const checkDuplicatedUser: User = await this.userService.findUserByName(name);
    if (checkDuplicatedUser) throw new ConflictException('User Already Exists');

    await this.userService.createUser(createUserDto);
  }

  generateAccessToken(id: string): string {
    return this.jwtService.sign({ sub: id }, { expiresIn: '1d' });
  }

  generateRefreshToken(id: string): string {
    return this.jwtService.sign({ sub: id }, { expiresIn: '7d' });
  }
}
